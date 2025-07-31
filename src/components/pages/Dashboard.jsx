import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { documentService } from "@/services/api/documentService";
import ApperIcon from "@/components/ApperIcon";
import UploadZone from "@/components/molecules/UploadZone";
import DocumentCard from "@/components/molecules/DocumentCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Analysis from "@/components/pages/Analysis";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Mock conversations data
  const mockConversations = [
    {
      Id: 1,
      title: "Employment Contract Analysis",
      documentType: "Employment Contract",
      lastMessage: "The contract appears to have some concerning clauses regarding overtime pay...",
      timestamp: new Date().toISOString(),
      messageCount: 12
    },
    {
      Id: 2,
      title: "Rental Agreement Review",
      documentType: "Rental Agreement",
      lastMessage: "I've identified several tenant rights issues in this lease agreement...",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      messageCount: 8
    },
    {
      Id: 3,
      title: "Divorce Settlement Terms",
      documentType: "Divorce Document",
      lastMessage: "The asset division appears fair, but there are some concerns about...",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      messageCount: 15
    }
  ];

  // Mock messages for current conversation
  const mockMessages = [
    {
      Id: 1,
      type: "user",
      content: "Hi, I need help analyzing this employment contract. Can you review it for any concerning clauses?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      attachments: [{
        name: "employment_contract.pdf",
        size: "2.4 MB",
        type: "pdf"
      }]
    },
    {
      Id: 2,
      type: "ai",
      content: "I'd be happy to help you analyze your employment contract! I can see you've uploaded a PDF document. Let me review it for any concerning clauses, particularly around compensation, working hours, termination conditions, and employee rights.\n\nGive me a moment to process the document...",
      timestamp: new Date(Date.now() - 3580000).toISOString()
    },
    {
      Id: 3,
      type: "ai",
      content: "I've completed my analysis of your employment contract. Here are the key findings:\n\n**⚠️ Areas of Concern:**\n• Overtime compensation clause is vague and may not comply with labor standards\n• Non-compete clause is overly broad (2-year restriction)\n• Termination notice period favors employer (30 days given, 14 days required)\n\n**✅ Positive Aspects:**\n• Base salary and benefits are clearly defined\n• Vacation time allocation is fair\n• Intellectual property rights are reasonably balanced\n\nWould you like me to explain any of these points in more detail?",
      timestamp: new Date(Date.now() - 3400000).toISOString()
    }
  ];

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setConversations(mockConversations);
      if (mockConversations.length > 0) {
        setCurrentConversation(mockConversations[0]);
        setMessages(mockMessages);
      }
    } catch (err) {
      setError("Failed to load conversations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    const newConversation = {
      Id: Date.now(),
      title: "New Document Analysis",
      documentType: "",
      lastMessage: "",
      timestamp: new Date().toISOString(),
      messageCount: 0
    };
    setCurrentConversation(newConversation);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleConversationSelect = (conversation) => {
    setCurrentConversation(conversation);
    setMessages(conversation.Id === 1 ? mockMessages : []);
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      Id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        Id: Date.now() + 1,
        type: "ai",
        content: "Thank you for your message. I'm analyzing your request and will provide a detailed response shortly. Please note that this is a demo response - in the full version, I would provide comprehensive legal document analysis based on your specific query.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      toast.success("Response received!");
    }, 2000);
  };

  const handleFileUpload = async (file) => {
    const userMessage = {
      Id: Date.now(),
      type: "user",
      content: "I've uploaded a document for analysis. Please review it and provide your insights.",
      timestamp: new Date().toISOString(),
      attachments: [{
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.split('.').pop().toLowerCase()
      }]
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    toast.success(`File "${file.name}" uploaded successfully!`);

    // Simulate AI processing
    setTimeout(() => {
      const aiMessage = {
        Id: Date.now() + 1,
        type: "ai",
        content: `I've received your document "${file.name}" and I'm processing it now. This may take a few moments while I analyze the content, structure, and identify key legal terms and potential issues.\n\nI'll provide you with a comprehensive analysis including:\n• Summary of key terms\n• Risk assessment\n• Areas of concern\n• Recommendations\n\nPlease hold on while I complete the analysis...`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="h-10 bg-gray-200 rounded shimmer mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded shimmer"></div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-white border-b border-gray-200 p-4">
            <div className="h-6 bg-gray-200 rounded shimmer w-48"></div>
          </div>
          <div className="flex-1 p-4">
            <Loading type="document" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Error message={error} onRetry={loadConversations} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`fixed lg:relative z-50 w-80 bg-white border-r border-gray-200 h-full flex flex-col transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleNewConversation}
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Document Analysis
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-3">
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentConversation?.Id === conversation.Id
                    ? "bg-primary-50 border border-primary-200"
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                }`}
                onClick={() => handleConversationSelect(conversation)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                    {conversation.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                    {conversation.documentType || "General"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {conversation.lastMessage || "No messages yet"}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{format(new Date(conversation.timestamp), 'MMM d, HH:mm')}</span>
                  <span>{conversation.messageCount} messages</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-semibold text-gray-900">
                {currentConversation?.title || "Select a conversation"}
              </h2>
              {currentConversation?.documentType && (
                <p className="text-sm text-gray-600">
                  Analyzing: {currentConversation.documentType}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="FileText" className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">AI Legal Assistant</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 ${
          dragOver ? 'bg-primary-50 border-2 border-dashed border-primary-300' : ''
        }`}>
          {!currentConversation ? (
            <Empty
              title="Welcome to Legaleaze Chat"
              description="Start a new conversation to analyze your legal documents with AI assistance. Upload documents, ask questions, and get comprehensive legal insights."
              actionLabel="New Document Analysis"
              onAction={handleNewConversation}
              icon="MessageSquare"
            />
          ) : messages.length === 0 ? (
            <Empty
              title="Start Your Document Analysis"
              description="Upload a legal document or ask me any questions about legal matters. I'm here to help you understand complex legal terms and identify potential issues."
              actionLabel="Upload Document"
              onAction={() => document.getElementById('file-input').click()}
              icon="Upload"
            />
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      message.type === 'user' ? 'bg-primary-500' : 'bg-gray-500'
                    }`}>
                      {message.type === 'user' ? 'U' : 'AI'}
                    </div>
                    <div className={`p-4 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.attachments && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                              message.type === 'user' ? 'bg-primary-400' : 'bg-gray-50'
                            }`}>
                              <ApperIcon name="FileText" className="w-5 h-5" />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{attachment.name}</p>
                                <p className="text-xs opacity-75">{attachment.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {format(new Date(message.timestamp), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm font-medium">
                  AI
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {dragOver && (
            <div className="fixed inset-0 bg-primary-500 bg-opacity-10 flex items-center justify-center z-30">
              <div className="bg-white rounded-xl p-8 text-center shadow-xl">
                <ApperIcon name="Upload" className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop your document here</h3>
                <p className="text-gray-600">Release to upload and start analysis</p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <input
              type="file"
              id="file-input"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
            />
            <button
              className="p-2 text-gray-500 hover:text-primary-500 transition-colors duration-200"
              onClick={() => document.getElementById('file-input').click()}
            >
              <ApperIcon name="Paperclip" className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about your legal document..."
                className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
            >
              <ApperIcon name="Send" className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses are generated for demonstration. Always consult with a qualified attorney for legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;