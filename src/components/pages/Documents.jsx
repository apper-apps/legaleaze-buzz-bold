import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import DocumentCard from "@/components/molecules/DocumentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { documentService } from "@/services/api/documentService";

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filters = [
    { id: "all", label: "All Documents", count: 0 },
    { id: "high", label: "High Risk", count: 0 },
    { id: "medium", label: "Medium Risk", count: 0 },
    { id: "low", label: "Low Risk", count: 0 }
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "name", label: "File Name" },
    { id: "risk", label: "Risk Level" }
  ];

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
    } catch (err) {
      setError("Failed to load documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentClick = (document) => {
    navigate(`/analysis/${document.Id}`);
  };

  const handleDeleteDocument = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await documentService.delete(documentId);
        setDocuments(prev => prev.filter(doc => doc.Id !== documentId));
      } catch (err) {
        setError("Failed to delete document. Please try again.");
      }
    }
  };

  // Filter and sort documents
  const filteredAndSortedDocuments = React.useMemo(() => {
    let filtered = documents;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply risk filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(doc =>
        doc.analysisResult?.riskLevel === selectedFilter
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case "oldest":
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case "name":
          return a.fileName.localeCompare(b.fileName);
        case "risk":
          const riskOrder = { high: 3, medium: 2, low: 1 };
          return (riskOrder[b.analysisResult?.riskLevel] || 0) - (riskOrder[a.analysisResult?.riskLevel] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [documents, searchTerm, selectedFilter, sortBy]);

  // Update filter counts
  const updatedFilters = filters.map(filter => ({
    ...filter,
    count: filter.id === "all" 
      ? documents.length 
      : documents.filter(doc => doc.analysisResult?.riskLevel === filter.id).length
  }));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded shimmer w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-96"></div>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Documents
            </h1>
            <p className="text-gray-600">
              Manage and review all your analyzed legal documents
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/upload")}
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-auto min-w-[140px]"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Risk Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {updatedFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.id
                  ? "bg-primary-100 text-primary-700 border border-primary-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{filter.label}</span>
              <Badge variant={selectedFilter === filter.id ? "primary" : "default"}>
                {filter.count}
              </Badge>
            </button>  
          ))}
        </div>
      </motion.div>

      {/* Document Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filteredAndSortedDocuments.length === 0 ? (
          documents.length === 0 ? (
            <Empty
              title="No documents yet"
              description="Upload your first legal document to get started with AI-powered analysis"
              actionLabel="Upload Document"
              onAction={() => navigate("/upload")}
              icon="FileText"
            />
          ) : (
            <Empty
              title="No documents match your criteria"
              description="Try adjusting your search terms or filters to find what you're looking for"
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchTerm("");
                setSelectedFilter("all");
              }}
              icon="Search"
            />
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDocuments.map((document, index) => (
              <motion.div
                key={document.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <DocumentCard
                  document={document}
                  onClick={handleDocumentClick}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Results Summary */}
      {filteredAndSortedDocuments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-gray-600"
        >
          <p>
            Showing {filteredAndSortedDocuments.length} of {documents.length} documents
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedFilter !== "all" && ` with ${selectedFilter} risk`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Documents;