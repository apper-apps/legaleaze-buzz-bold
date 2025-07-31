import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import PricingCard from "@/components/molecules/PricingCard";

const Subscription = () => {
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  const [currentPlan, setCurrentPlan] = useState({
    name: "Free Forever",
    price: 0,
    documentsUsed: 2,
    documentsLimit: 2,
    nextBilling: null,
    status: "active"
  });

  const pricingPlans = [
    {
      name: "Free Forever",
      price: 0,
      description: "Perfect for trying out our service",
      features: [
        "2 documents per month",
        "Basic plain English translation",
        "Red flag detection",
        "Email support"
      ]
    },
    {
      name: "Personal",
      price: 24.99,
      description: "For individuals dealing with legal documents",
      features: [
        "Unlimited documents",
        "Advanced risk analysis",
        "Deadline tracking & reminders",
        "Priority support",
        "Document history",
        "Financial breakdown analysis"
      ]
    },
    {
      name: "Family",
      price: 39.99,
      description: "Everything in Personal plus family-specific features",
      features: [
        "Everything in Personal",
        "Specialized divorce & custody analysis",
        "Child support calculator",
        "Custody calendar features",
        "Multi-user access",
        "Legal document templates"
      ]
    }
  ];

  const usageStats = [
    {
      label: "Documents This Month",
      value: `${currentPlan.documentsUsed}/${currentPlan.documentsLimit}`,
      icon: "FileText",
      color: "primary"
    },
    {
      label: "High Risk Documents",
      value: "1",
      icon: "AlertTriangle",
      color: "error"
    },
    {
      label: "Total Savings",
      value: "$1,200",
      icon: "DollarSign",
      color: "success"
    },
    {
      label: "Documents Analyzed",
      value: "3",
      icon: "BarChart3",
      color: "warning"
    }
  ];

  const handleSelectPlan = (plan) => {
    if (plan.name === currentPlan.name) {
      toast.info("You're already on this plan!");
      return;
    }

    if (plan.price === 0) {
      toast.info("You're already on the free plan!");
      return;
    }

    // Simulate subscription upgrade
    toast.success(`Successfully upgraded to ${plan.name} plan!`);
    setCurrentPlan({
      ...currentPlan,
      name: plan.name,
      price: plan.price,
      documentsLimit: plan.name === "Personal" ? 999 : 999,
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  };

  const handleCancelSubscription = () => {
    if (currentPlan.price === 0) {
      toast.info("You're on the free plan - nothing to cancel!");
      return;
    }

    if (window.confirm("Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.")) {
      toast.success("Subscription cancelled. You'll have access until the end of your billing period.");
      setCurrentPlan({
        ...currentPlan,
        status: "cancelled"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Subscription & Billing
        </h1>
        <p className="text-lg text-gray-600">
          Manage your subscription and view usage statistics
        </p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Current Plan: {currentPlan.name}
                </h2>
                <Badge variant={currentPlan.status === "active" ? "success" : "warning"}>
                  {currentPlan.status}
                </Badge>
              </div>
              <div className="text-gray-700">
                <p className="mb-1">
                  <span className="font-medium">${currentPlan.price}</span>
                  {currentPlan.price > 0 && "/month"}
                </p>
                {currentPlan.nextBilling && (
                  <p className="text-sm">
                    Next billing: {new Date(currentPlan.nextBilling).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentPlan.price > 0 && (
                <Button
                  variant="outline"
                  onClick={handleCancelSubscription}
                  disabled={currentPlan.status === "cancelled"}
                >
                  {currentPlan.status === "cancelled" ? "Cancelled" : "Cancel Plan"}
                </Button>
              )}
              <Button variant="primary">
                <ApperIcon name="CreditCard" className="w-4 h-4 mr-2" />
                Manage Billing
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Usage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Usage Statistics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                    <ApperIcon name={stat.icon} className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Usage Progress */}
      {currentPlan.documentsLimit < 999 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Document Usage
              </h3>
              <span className="text-sm text-gray-600">
                {currentPlan.documentsUsed} of {currentPlan.documentsLimit} used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(currentPlan.documentsUsed / currentPlan.documentsLimit) * 100}%`
                }}
              />
            </div>
            {currentPlan.documentsUsed >= currentPlan.documentsLimit && (
              <div className="mt-4 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="AlertTriangle" className="w-5 h-5 text-warning-600" />
                  <p className="text-warning-800 font-medium">
                    You've reached your monthly limit. Upgrade to continue uploading documents.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {/* Pricing Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600">
            Upgrade or downgrade at any time. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isPopular={plan.name === "Personal"}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-8 bg-gradient-to-r from-success-50 to-success-100 border-success-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Why Upgrade to Premium?
            </h3>
            <p className="text-gray-600">
              Join thousands of users who've saved money and avoided legal problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "Infinity",
                title: "Unlimited Documents",
                description: "Upload and analyze as many documents as you need"
              },
              {
                icon: "Shield",
                title: "Advanced Protection",
                description: "Deeper risk analysis and specialized document types"
              },
              {
                icon: "Clock",
                title: "Save Time & Money",
                description: "Avoid expensive lawyer consultations for simple reviews"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name={benefit.icon} className="w-6 h-6 text-success-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Subscription;