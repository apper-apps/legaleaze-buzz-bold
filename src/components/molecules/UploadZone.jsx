import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const UploadZone = ({ onFileSelect, accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png" }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`upload-zone ${isDragOver ? "dragover" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Upload" className="w-8 h-8 text-primary-600" />
        </motion.div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Your Legal Document
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your file here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Supports PDF, Word documents, and images (Max 10MB)
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="primary" size="lg" as="span">
              <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </label>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ApperIcon name="FileText" className="w-4 h-4" />
            <span>PDF</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="FileText" className="w-4 h-4" />
            <span>Word</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Image" className="w-4 h-4" />
            <span>Image</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadZone;