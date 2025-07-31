import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <ApperIcon
                key={i}
                name="Star"
                className="w-5 h-5 text-warning-400 fill-current"
              />
            ))}
          </div>
          <blockquote className="text-gray-700 mb-6">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
              {testimonial.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;