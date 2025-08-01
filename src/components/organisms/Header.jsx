import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { name: "Documents", path: "/documents", icon: "FileText" },
    { name: "Upload", path: "/upload", icon: "Upload" },
    { name: "Subscription", path: "/subscription", icon: "CreditCard" },
    { name: "Support", path: "/support", icon: "HelpCircle" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
{/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Scale" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Legaleaze</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
<div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                <ApperIcon name="Crown" className="w-4 h-4" />
                <span className="font-medium">Free Plan</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
{isAuthenticated ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  logout();
                  toast.success("Successfully signed out");
                  navigate("/");
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/subscription")}
            >
              Upgrade
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <ApperIcon
              name={isMobileMenuOpen ? "X" : "Menu"}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden glass-dark border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
<div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex flex-col space-y-3 px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    <ApperIcon name="Crown" className="w-4 h-4" />
                    <span className="font-medium">Free Plan</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                </div>
                <div className="flex space-x-2">
{isAuthenticated ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        logout();
                        toast.success("Successfully signed out");
                        navigate("/");
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex-1"
                    >
                      Sign In
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      navigate("/subscription");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1"
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;