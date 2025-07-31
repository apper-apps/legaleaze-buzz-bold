import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import RiskAlert from "@/components/molecules/RiskAlert";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { documentService } from "@/services/api/documentService";

const Analysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    loadDocument();
  }, [id]);

  const loadDocument = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = await documentService.getById(parseInt(id));
      if (!data) {
        setError("Document not found");
        return;
      }
      
      setDocument(data);
    } catch (err) {
      setError("Failed to load document analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    toast.success("Analysis exported successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const sections = [
    { id: "overview", title: "Overview", icon: "FileText" },
    { id: "risks", title: "Risk Analysis", icon: "AlertTriangle" },
    { id: "dates", title: "Important Dates", icon: "Calendar" },
    { id: "financial", title: "Financial Details", icon: "DollarSign" },
    { id: "recommendations", title: "Recommendations", icon: "Lightbulb" }
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading type="analysis" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadDocument} />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message="Document not found" />
      </div>
    );
  }

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/documents")}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {document.fileName}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Analyzed on {format(new Date(document.uploadDate), "MMM dd, yyyy")}</span>
              <Badge variant={getRiskColor(document.analysisResult?.riskLevel)}>
                {document.analysisResult?.riskLevel || "Unknown"} risk
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleShare}>
              <ApperIcon name="Share" className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="p-4 sticky top-24">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <ApperIcon name={section.icon} className="w-4 h-4" />
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="space-y-6">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Document Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {document.analysisResult?.plainEnglishSummary}
                  </p>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ApperIcon name="AlertTriangle" className="w-6 h-6 text-error-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Risk Level</h3>
                    <Badge variant={getRiskColor(document.analysisResult?.riskLevel)} className="text-sm">
                      {document.analysisResult?.riskLevel || "Unknown"}
                    </Badge>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ApperIcon name="AlertCircle" className="w-6 h-6 text-warning-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Issues Found</h3>
                    <p className="text-2xl font-bold text-warning-600">{document.risks?.length || 0}</p>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ApperIcon name="Calendar" className="w-6 h-6 text-success-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Key Dates</h3>
                    <p className="text-2xl font-bold text-success-600">{document.deadlines?.length || 0}</p>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Risk Analysis Section */}
            {activeSection === "risks" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Risk Analysis
                  </h2>
                  <Badge variant={getRiskColor(document.analysisResult?.riskLevel)}>
                    Overall: {document.analysisResult?.riskLevel || "Unknown"} risk
                  </Badge>
                </div>

                {document.risks && document.risks.length > 0 ? (
                  <div className="space-y-4">
                    {document.risks.map((risk, index) => (
                      <RiskAlert key={index} risk={risk} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <ApperIcon name="CheckCircle" className="w-12 h-12 text-success-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Major Risks Detected
                    </h3>
                    <p className="text-gray-600">
                      This document appears to have standard terms with no significant red flags.
                    </p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Important Dates Section */}
            {activeSection === "dates" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  Important Dates & Deadlines
                </h2>

                {document.deadlines && document.deadlines.length > 0 ? (
                  <div className="space-y-4">
                    {document.deadlines.map((deadline, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              deadline.priority === "high" 
                                ? "bg-error-100" 
                                : deadline.priority === "medium"
                                ? "bg-warning-100"
                                : "bg-success-100"
                            }`}>
                              <ApperIcon 
                                name="Calendar" 
                                className={`w-6 h-6 ${
                                  deadline.priority === "high" 
                                    ? "text-error-600" 
                                    : deadline.priority === "medium"
                                    ? "text-warning-600"
                                    : "text-success-600"
                                }`} 
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {deadline.description}
                              </h3>
                              <p className="text-gray-600">
                                {format(new Date(deadline.date), "MMMM dd, yyyy")}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant={
                              deadline.priority === "high" 
                                ? "error" 
                                : deadline.priority === "medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            {deadline.priority} priority
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <ApperIcon name="Calendar" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Specific Dates Found
                    </h3>
                    <p className="text-gray-600">
                      This document doesn't contain specific deadlines or important dates.
                    </p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Financial Details Section */}
            {activeSection === "financial" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  Financial Breakdown
                </h2>

                {document.financialObligations ? (
                  <div className="space-y-6">
                    {/* Total Cost Card */}
                    <Card className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Total Financial Obligation
                        </h3>
                        <p className="text-3xl font-bold gradient-text">
                          ${document.financialObligations.totalCost?.toLocaleString() || "0"}
                        </p>
                      </div>
                    </Card>

                    {/* Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {document.financialObligations.monthlyRent && (
                        <Card className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">Monthly Payment</h4>
                              <p className="text-gray-600">Recurring monthly cost</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900">
                              ${document.financialObligations.monthlyRent.toLocaleString()}
                            </p>
                          </div>
                        </Card>
                      )}

                      {document.financialObligations.securityDeposit && (
                        <Card className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">Security Deposit</h4>
                              <p className="text-gray-600">Refundable deposit</p>
                            </div>
                            <p className="text-xl font-bold text-gray-900">
                              ${document.financialObligations.securityDeposit.toLocaleString()}
                            </p>
                          </div>
                        </Card>
                      )}
                    </div>

                    {/* Additional Fees */}
                    {document.financialObligations.additionalFees && document.financialObligations.additionalFees.length > 0 && (
                      <Card className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Additional Fees</h4>
                        <div className="space-y-3">
                          {document.financialObligations.additionalFees.map((fee, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <span className="font-medium text-gray-900">{fee.name}</span>
                                <span className={`ml-2 text-sm ${fee.refundable ? "text-success-600" : "text-error-600"}`}>
                                  ({fee.refundable ? "Refundable" : "Non-refundable"})
                                </span>
                              </div>
                              <span className="font-semibold text-gray-900">
                                ${fee.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <ApperIcon name="DollarSign" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Financial Details Found
                    </h3>
                    <p className="text-gray-600">
                      This document doesn't contain specific financial obligations or costs.
                    </p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Recommendations Section */}
            {activeSection === "recommendations" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommendations & Next Steps
                </h2>

                {document.analysisResult?.recommendations && document.analysisResult.recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {document.analysisResult.recommendations.map((recommendation, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ApperIcon name="Lightbulb" className="w-4 h-4 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-gray-700">{recommendation}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <ApperIcon name="CheckCircle" className="w-12 h-12 text-success-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Document Looks Good
                    </h3>
                    <p className="text-gray-600">
                      No specific recommendations at this time. The document appears to be standard.
                    </p>
                  </Card>
                )}

                {/* General Advice */}
                <Card className="p-6 bg-gradient-to-r from-warning-50 to-warning-100 border-warning-200">
                  <div className="flex items-start space-x-4">
                    <ApperIcon name="AlertCircle" className="w-6 h-6 text-warning-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-warning-900 mb-2">
                        Important Disclaimer
                      </h3>
                      <p className="text-warning-800 text-sm">
                        This analysis is provided for informational purposes only and does not constitute legal advice. 
                        For complex legal matters or if you have concerns about this document, please consult with a 
                        qualified attorney in your jurisdiction.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analysis;