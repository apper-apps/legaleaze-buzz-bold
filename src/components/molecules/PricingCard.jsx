import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const PricingCard = ({ plan, isPopular = false, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`relative ${isPopular ? "scale-105" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
            Most Popular
          </div>
        </div>
      )}

      <Card
        variant={isPopular ? "elevated" : "default"}
        className={`h-full ${
          isPopular ? "ring-2 ring-primary-500 ring-opacity-50" : ""
        }`}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {plan.name}
            </h3>
            <div className="mb-4">
              <span className="text-4xl font-bold gradient-text">
                ${plan.price}
              </span>
              {plan.price > 0 && (
                <span className="text-gray-600">/month</span>
              )}
            </div>
            <p className="text-gray-600">{plan.description}</p>
          </div>

          <div className="space-y-4 mb-8">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <ApperIcon
                  name="Check"
                  className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <Button
            variant={isPopular ? "primary" : "secondary"}
            className="w-full"
            onClick={() => onSelect(plan)}
          >
            {plan.price === 0 ? "Get Started Free" : "Start Free Trial"}
          </Button>

          {plan.price > 0 && (
            <p className="text-center text-sm text-gray-500 mt-3">
              No credit card required
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PricingCard;