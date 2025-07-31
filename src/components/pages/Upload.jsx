import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import UploadZone from "@/components/molecules/UploadZone";
import { documentService } from "@/services/api/documentService";

const Upload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(location.state?.file || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const documentTypes = [
    {
      icon: "Home",
      title: "Rental & Lease Agreements",
      description: "Apartment leases, rental contracts, property agreements"
    },
    {
      icon: "Briefcase",
      title: "Employment Contracts",
      description: "Job offers, freelance agreements, NDAs, non-competes"
    },
    {
      icon: "Heart",
      title: "Divorce & Family Documents",
      description: "Divorce decrees, custody agreements, child support orders"
    },
    {
      icon: "Shield",
      title: "Insurance Policies",
      description: "Health, auto, life insurance policies and claims"
    },
    {
      icon: "Building",
      title: "Business Contracts",
      description: "Partnership agreements, vendor contracts, service agreements"
    },
    {
      icon: "CreditCard",
      title: "Financial Documents",
      description: "Loan agreements, mortgage documents, credit agreements"
    }
  ];

  const handleFileSelect = (file) => {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, Word document, or image file.");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB.");
      return;
    }

    setSelectedFile(file);
    toast.success("File selected successfully!");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create document record
      const documentData = {
        fileName: selectedFile.name,
        fileType: selectedFile.name.split('.').pop().toLowerCase(),
        uploadDate: new Date().toISOString(),
        analysisResult: {
          plainEnglishSummary: "This rental agreement contains standard lease terms with some areas of concern. The document establishes a 12-month lease period with specific rent payment requirements and security deposit conditions.",
          riskLevel: "medium",
          keyDates: [
            {
              date: "2024-12-01",
              description: "Lease start date",
              type: "start"
            },
            {
              date: "2024-11-30",
              description: "Lease end date",
              type: "end"
            }
          ],
          totalFinancialObligation: 15600,
          recommendations: [
            "Review the pet fee policy carefully",
            "Understand the early termination clause",
            "Clarify maintenance responsibilities"
          ]
        },
        risks: [
          {
            level: "high",
            title: "Hidden Pet Fee",
            description: "There's a $500 non-refundable pet fee buried in section 12.3 that's not mentioned in the main terms.",
            recommendation: "Negotiate this fee or ensure you understand it's non-refundable."
          },
          {
            level: "medium",
            title: "Early Termination Penalty",
            description: "Breaking the lease early results in forfeiture of security deposit plus 2 months rent.",
            recommendation: "Consider the implications if you need to move before lease end."
          }
        ],
        deadlines: [
          {
            date: "2024-12-01",
            description: "First rent payment due",
            priority: "high"
          },
          {
            date: "2024-11-15",
            description: "Security deposit due",
            priority: "high"
          }
        ],
        financialObligations: {
          monthlyRent: 1300,
          securityDeposit: 1300,
          totalCost: 15600,
          additionalFees: [
            { name: "Pet Fee", amount: 500, refundable: false },
            { name: "Application Fee", amount: 100, refundable: false }
          ]
        }
      };

      clearInterval(progressInterval);
      setUploadProgress(100);

      const createdDocument = await documentService.create(documentData);

      toast.success("Document analyzed successfully!");
      
      setTimeout(() => {
        navigate(`/analysis/${createdDocument.Id}`);
      }, 500);

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload and analyze document. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Legal Document
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get instant AI-powered analysis, risk detection, and plain English explanations for any legal document.
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="p-8">
          {!selectedFile ? (
            <UploadZone onFileSelect={handleFileSelect} />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="CheckCircle" className="w-8 h-8 text-success-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                File Selected
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="FileText" className="w-6 h-6 text-primary-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
              </div>

              {isUploading ? (
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-gray-600">
                    {uploadProgress < 50 ? "Uploading document..." : 
                     uploadProgress < 90 ? "Analyzing with AI..." : 
                     "Finalizing analysis..."}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedFile(null)}
                  >
                    Choose Different File
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    <ApperIcon name="Zap" className="w-4 h-4 mr-2" />
                    Analyze Document
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Document Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          We Support All Types of Legal Documents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-4 h-full">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={type.icon} className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {type.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            What You'll Get After Upload
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "FileText",
                title: "Plain English Translation",
                description: "Complex legal jargon converted to everyday language"
              },
              {
                icon: "AlertTriangle",
                title: "Risk Detection",
                description: "Color-coded warnings for problematic clauses"
              },
              {
                icon: "Calendar",
                title: "Important Dates",
                description: "All deadlines and key dates extracted automatically"
              },
              {
                icon: "DollarSign",
                title: "Financial Breakdown",
                description: "Total costs and payment obligations calculated"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Upload;