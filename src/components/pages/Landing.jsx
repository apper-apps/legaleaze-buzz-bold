import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import PricingCard from "@/components/molecules/PricingCard";
import TestimonialCard from "@/components/molecules/TestimonialCard";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "FileText",
      title: "Any Legal Document",
      description: "Rental agreements, employment contracts, divorce papers, insurance policies, business agreements, and more."
    },
    {
      icon: "AlertTriangle",
      title: "Smart Risk Detection",
      description: "Automatic red flag identification, hidden fee warnings, unfair clause alerts, and missing protection notices."
    },
    {
      icon: "Calendar",
      title: "Deadline Management",
      description: "Extract important dates, set automatic reminders, track renewal periods, and get court hearing notifications."
    },
    {
      icon: "DollarSign",
      title: "Financial Analysis",
      description: "Total cost calculations, payment schedule summaries, penalty explanations, and child support tracking."
    },
    {
      icon: "GitCompare",
      title: "Document Comparison",
      description: "Compare multiple contracts, see differences highlighted, choose the better deal, and negotiate with confidence."
    },
    {
      icon: "Shield",
      title: "Secure & Private",
      description: "All documents are encrypted, processed securely, and automatically deleted after analysis unless saved."
    }
  ];

  const steps = [
    {
      icon: "Upload",
      title: "Upload Your Document",
      description: "Drag and drop any PDF, photo, or Word document including leases, contracts, divorce papers, employment agreements."
    },
    {
      icon: "Zap",
      title: "Get Instant Analysis",
      description: "AI breaks down complex legal language into simple explanations with risk warnings and key information."
    },
    {
      icon: "CheckCircle",
      title: "Make Informed Decisions",
      description: "See exactly what you're agreeing to, what could go wrong, and what questions to ask before signing."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Renter",
      quote: "I almost signed a lease with a $500 hidden pet fee buried in paragraph 47. Legaleaze caught it in seconds!"
    },
    {
      name: "Mike T.",
      role: "Divorced Father",
      quote: "My divorce decree was 23 pages of legal gibberish. Legaleaze showed me exactly when I could modify child support."
    },
    {
      name: "Jennifer L.",
      role: "Marketing Manager",
      quote: "Saved me $1,200 in lawyer fees just to understand my employment contract. This app paid for itself instantly."
    }
  ];

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

  const faqs = [
    {
      question: "What types of documents can Legaleaze analyze?",
      answer: "Any legal document - rental agreements, employment contracts, divorce papers, insurance policies, business agreements, loan documents, court orders, and more."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI is trained on millions of legal documents and continuously improved. However, for complex legal matters, we always recommend consulting with a qualified attorney."
    },
    {
      question: "Is my document information secure?",
      answer: "Yes. All documents are encrypted, processed securely, and automatically deleted after analysis unless you save them to your account."
    },
    {
      question: "Can I use this for business contracts?",
      answer: "Absolutely. Many small business owners use Legaleaze to understand vendor agreements, client contracts, and partnership documents."
    },
    {
      question: "Do you provide legal advice?",
      answer: "No, we provide document analysis and explanation. For legal advice, please consult with a qualified attorney in your jurisdiction."
    }
  ];

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleSelectPlan = (plan) => {
    navigate("/subscription", { state: { selectedPlan: plan } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Scale" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Legaleaze</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Sign In
              </Button>
              <Button variant="primary" onClick={handleGetStarted}>
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Never Sign Another Contract<br />
              You Don't Understand
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl mb-4 text-blue-100"
            >
              Stop getting trapped by legal jargon. Legaleaze translates any legal document into plain English in seconds.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 text-blue-200 max-w-3xl mx-auto"
            >
              From rental agreements to divorce papers - understand exactly what you're signing before it's too late.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button
                variant="secondary"
                size="xl"
                onClick={handleGetStarted}
                className="bg-white text-primary-600 hover:bg-gray-50"
              >
                <ApperIcon name="Upload" className="w-5 h-5 mr-2" />
                Upload Your Document
              </Button>
              <Button
                variant="ghost"
                size="xl"
                className="text-white border-white hover:bg-white hover:bg-opacity-10"
              >
                <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-blue-200 mt-4"
            >
              No credit card required • 2 free documents
            </motion.p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Problem: You're Signing Blind
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Home",
                title: "Hidden Lease Fees",
                description: "Sign leases without understanding hidden fees buried in complex language."
              },
              {
                icon: "Briefcase",
                title: "Employment Traps",
                description: "Agree to employment terms that weren't what you thought they were."
              },
              {
                icon: "Heart",
                title: "Divorce Confusion",
                description: "Feel overwhelmed by divorce paperwork and court orders."
              },
              {
                icon: "AlertTriangle",
                title: "Missing Important Details",
                description: "Worry you missed something important in contracts that could cost you."
              },
              {
                icon: "DollarSign",
                title: "Expensive Legal Fees",
                description: "Pay lawyers hundreds just to explain what you already signed."
              },
              {
                icon: "Clock",
                title: "Time Pressure",
                description: "Feel pressured to sign without proper time to understand the terms."
              }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6">
                  <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={problem.icon} className="w-6 h-6 text-error-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600">{problem.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Solution: Google Translate, But for Legal Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Legaleaze uses AI to instantly translate legal jargon into everyday language, giving you the power to understand what you're signing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get from confusion to clarity in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto text-white text-xl font-bold">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent"></div>
                  )}
                </div>
                <ApperIcon name={step.icon} className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real Stories from Real People
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who've already avoided legal disasters with Legaleaze
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              No hidden fees. Cancel anytime. We practice what we preach.
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Signing Blind. Start Understanding.
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't let another confusing contract cost you money, time, or peace of mind. Upload your first document now and see exactly what you're agreeing to - in plain English.
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={handleGetStarted}
              className="bg-white text-primary-600 hover:bg-gray-50"
            >
              Get Started Free - No Credit Card Required
            </Button>
            <p className="text-blue-200 mt-4">
              Join thousands who've already avoided legal disasters with Legaleaze
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Scale" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Legaleaze</span>
              </div>
              <p className="text-gray-400">
                Translating legal documents into plain English, so you never sign blind again.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Legal Resources</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Legaleaze. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;