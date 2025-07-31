import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const DocumentCard = ({ document, onClick }) => {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "FileText";
      case "docx":
      case "doc":
        return "FileText";
      case "jpg":
      case "jpeg":
      case "png":
        return "Image";
      default:
        return "File";
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        variant="document"
        className="cursor-pointer group"
        onClick={() => onClick(document)}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                <ApperIcon
                  name={getFileIcon(document.fileType)}
                  className="w-5 h-5 text-primary-600"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                  {document.fileName}
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(document.uploadDate), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
            {document.analysisResult?.riskLevel && (
              <Badge variant={getRiskColor(document.analysisResult.riskLevel)}>
                {document.analysisResult.riskLevel} risk
              </Badge>
            )}
          </div>

          {document.analysisResult?.plainEnglishSummary && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {document.analysisResult.plainEnglishSummary}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <ApperIcon name="AlertTriangle" className="w-4 h-4" />
                <span>{document.risks?.length || 0} risks</span>
              </span>
              <span className="flex items-center space-x-1">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span>{document.deadlines?.length || 0} dates</span>
              </span>
            </div>
            <ApperIcon
              name="ChevronRight"
              className="w-4 h-4 group-hover:text-primary-600 transition-colors duration-200"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DocumentCard;