import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import DocumentCard from "@/components/molecules/DocumentCard";
import UploadZone from "@/components/molecules/UploadZone";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { documentService } from "@/services/api/documentService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalDocuments: 0,
    documentsThisMonth: 2,
    monthlyLimit: 2,
    highRiskDocuments: 0,
    upcomingDeadlines: 0
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = await documentService.getAll();
      setDocuments(data);
      
      // Calculate stats
      const highRisk = data.filter(doc => doc.analysisResult?.riskLevel === "high").length;
      const upcomingDeadlines = data.reduce((acc, doc) => acc + (doc.deadlines?.length || 0), 0);
      
      setStats(prev => ({
        ...prev,
        totalDocuments: data.length,
        highRiskDocuments: highRisk,
        upcomingDeadlines
      }));
    } catch (err) {
      setError("Failed to load documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    if (stats.documentsThisMonth >= stats.monthlyLimit) {
      toast.error("You've reached your monthly limit. Upgrade to continue.");
      navigate("/subscription");
      return;
    }

    navigate("/upload", { state: { file } });
  };

  const handleDocumentClick = (document) => {
    navigate(`/analysis/${document.Id}`);
  };

  const handleUpgrade = () => {
    navigate("/subscription");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded shimmer w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-card border border-gray-100 p-6">
              <div className="h-4 bg-gray-200 rounded shimmer w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded shimmer w-16"></div>
            </div>
          ))}
        </div>
        <Loading type="document" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadDocuments} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your legal documents
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Documents</p>
                <p className="text-2xl font-bold gradient-text">{stats.totalDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="FileText" className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.documentsThisMonth}/{stats.monthlyLimit}
                </p>
              </div>
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-5 h-5 text-warning-600" />
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-warning-500 to-warning-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(stats.documentsThisMonth / stats.monthlyLimit) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">High Risk Docs</p>
                <p className="text-2xl font-bold text-error-600">{stats.highRiskDocuments}</p>
              </div>
              <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="AlertTriangle" className="w-5 h-5 text-error-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming Deadlines</p>
                <p className="text-2xl font-bold text-success-600">{stats.upcomingDeadlines}</p>
              </div>
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Clock" className="w-5 h-5 text-success-600" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Usage Warning */}
      {stats.documentsThisMonth >= stats.monthlyLimit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-warning-50 to-warning-100 border-warning-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ApperIcon name="AlertTriangle" className="w-6 h-6 text-warning-600" />
                <div>
                  <h3 className="font-semibold text-warning-900">Monthly limit reached</h3>
                  <p className="text-warning-700">
                    You've used all {stats.monthlyLimit} free documents this month. Upgrade for unlimited access.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={handleUpgrade}
              >
                Upgrade Now
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Upload */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Upload
            </h2>
            <UploadZone onFileSelect={handleFileUpload} />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                {stats.monthlyLimit - stats.documentsThisMonth} uploads remaining
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/upload")}
              >
                Full Upload Page
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Recent Documents */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Documents
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/documents")}
            >
              View All
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {documents.length === 0 ? (
            <Empty
              title="No documents yet"
              description="Upload your first legal document to get started with AI-powered analysis"
              actionLabel="Upload Document"
              onAction={() => navigate("/upload")}
              icon="FileText"
            />
          ) : (
            <div className="space-y-4">
              {documents.slice(0, 3).map((document) => (
                <DocumentCard
                  key={document.Id}
                  document={document}
                  onClick={handleDocumentClick}
                />
              ))}
              
              {documents.length > 3 && (
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/documents")}
                  >
                    View {documents.length - 3} More Documents
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 cursor-pointer group" onClick={() => navigate("/upload")}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                <ApperIcon name="Upload" className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                  Upload Document
                </h3>
                <p className="text-sm text-gray-600">
                  Analyze a new legal document
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer group" onClick={() => navigate("/documents")}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center group-hover:bg-success-200 transition-colors duration-200">
                <ApperIcon name="FileText" className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-success-600 transition-colors duration-200">
                  Browse Documents
                </h3>
                <p className="text-sm text-gray-600">
                  View all analyzed documents
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer group" onClick={handleUpgrade}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center group-hover:bg-warning-200 transition-colors duration-200">
                <ApperIcon name="Crown" className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-warning-600 transition-colors duration-200">
                  Upgrade Plan
                </h3>
                <p className="text-sm text-gray-600">
                  Unlock unlimited documents
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;