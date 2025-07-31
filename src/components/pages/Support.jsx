import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "What types of documents can Legaleaze analyze?",
      answer: "Legaleaze can analyze any legal document including rental agreements, employment contracts, divorce papers, insurance policies, business agreements, loan documents, court orders, and more. We support PDF, Word documents, and image files."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI is trained on millions of legal documents and continuously improved. While we strive for high accuracy, this analysis is for informational purposes only. For complex legal matters, we always recommend consulting with a qualified attorney."
    },
    {
      question: "Is my document information secure?",
      answer: "Yes, absolutely. All documents are encrypted during upload and processing. We use industry-standard security measures to protect your data. Documents are automatically deleted after analysis unless you save them to your account."
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes, you can change your subscription plan at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle. There are no cancellation fees."
    },
    {
      question: "Do you provide legal advice?",
      answer: "No, Legaleaze provides document analysis and explanation services only. We do not provide legal advice. For legal advice specific to your situation, please consult with a qualified attorney in your jurisdiction."
    },
    {
      question: "What happens if I reach my monthly document limit?",
      answer: "If you reach your monthly limit on the free plan, you'll need to upgrade to continue uploading documents. Premium plans offer unlimited document uploads."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to premium features until the end of your current billing period."
    },
    {
      question: "How long does document analysis take?",
      answer: "Most documents are analyzed within 30-60 seconds. Complex or longer documents may take up to 2-3 minutes. You'll see a progress indicator during the analysis process."
    }
  ];

  const supportOptions = [
    {
      icon: "MessageSquare",
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 9 AM - 6 PM EST"
    },
    {
      icon: "Mail",
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "Send Email",
      available: "Response within 24 hours"
    },
    {
      icon: "Phone",
      title: "Phone Support",
      description: "Speak directly with our support team",
      action: "Call Now",
      available: "Premium subscribers only",
      premium: true
    },
    {
      icon: "BookOpen",
      title: "Help Center",
      description: "Browse our comprehensive documentation",
      action: "Browse Articles",
      available: "Available 24/7"
    }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Your message has been sent! We'll get back to you soon.");
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        priority: "medium"
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          How Can We Help You?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get support for your Legaleaze account, technical issues, or questions about legal document analysis.
        </p>
      </motion.div>

      {/* Support Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Choose Your Support Method
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className={`p-6 text-center cursor-pointer transition-all duration-200 hover:shadow-lg ${option.premium ? "border-warning-200 bg-warning-50" : ""}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                  option.premium ? "bg-warning-100" : "bg-primary-100"
                }`}>
                  <ApperIcon 
                    name={option.icon} 
                    className={`w-6 h-6 ${option.premium ? "text-warning-600" : "text-primary-600"}`} 
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {option.title}
                  {option.premium && (
                    <span className="ml-2 text-xs bg-warning-100 text-warning-800 px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <p className="text-xs text-gray-500 mb-4">{option.available}</p>
                <Button 
                  variant={option.premium ? "outline" : "primary"} 
                  size="sm"
                  disabled={option.premium}
                >
                  {option.action}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name *"
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
                <Input
                  label="Email *"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <Input
                label="Subject"
                type="text"
                value={contactForm.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief description of your issue"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  value={contactForm.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="input-field"
                >
                  <option value="low">Low - General question</option>
                  <option value="medium">Medium - Account issue</option>
                  <option value="high">High - Technical problem</option>
                  <option value="urgent">Urgent - Service disruption</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                  required
                  className="input-field resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find quick answers to the most common questions about Legaleaze.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ApperIcon
                      name={expandedFaq === index ? "ChevronUp" : "ChevronDown"}
                      className="w-5 h-5 text-gray-500 flex-shrink-0"
                    />
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Card className="p-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need More Help?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of Legaleaze. 
              We typically respond to all inquiries within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>Average response time: 4 hours</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <ApperIcon name="Star" className="w-4 h-4" />
                <span>99% customer satisfaction</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Support;