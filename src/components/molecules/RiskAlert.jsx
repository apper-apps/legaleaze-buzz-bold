import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const RiskAlert = ({ risk }) => {
  const getRiskIcon = (level) => {
    switch (level) {
      case "high":
        return "AlertTriangle";
      case "medium":
        return "AlertCircle";
      case "low":
        return "Info";
      default:
        return "AlertCircle";
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "bg-error-50 border-error-200";
      case "medium":
        return "bg-warning-50 border-warning-200";
      case "low":
        return "bg-success-50 border-success-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getRiskColor(risk.level)}`}>
      <div className="flex items-start space-x-3">
        <ApperIcon
          name={getRiskIcon(risk.level)}
          className={`w-5 h-5 mt-0.5 ${
            risk.level === "high"
              ? "text-error-600"
              : risk.level === "medium"
              ? "text-warning-600"
              : "text-success-600"
          }`}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{risk.title}</h4>
            <Badge variant={risk.level}>{risk.level} risk</Badge>
          </div>
          <p className="text-gray-700 mb-3">{risk.description}</p>
          {risk.recommendation && (
            <div className="bg-white bg-opacity-50 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-1">Recommendation:</h5>
              <p className="text-gray-700 text-sm">{risk.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskAlert;