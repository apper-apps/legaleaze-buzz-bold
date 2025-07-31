import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "default", className = "" }) => {
  if (type === "document") {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            className="bg-white rounded-xl shadow-card border border-gray-100 p-6"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg shimmer"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: "70%" }}></div>
                <div className="h-3 bg-gray-200 rounded shimmer" style={{ width: "50%" }}></div>
                <div className="h-3 bg-gray-200 rounded shimmer" style={{ width: "80%" }}></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "analysis") {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded shimmer" style={{ width: "40%" }}></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: "90%" }}></div>
              <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.3,
              }}
              className="bg-white rounded-xl shadow-card border border-gray-100 p-6"
            >
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded shimmer" style={{ width: "60%" }}></div>
                <div className="h-4 bg-gray-200 rounded shimmer"></div>
                <div className="h-4 bg-gray-200 rounded shimmer" style={{ width: "80%" }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full"
      />
    </div>
  );
};

export default Loading;