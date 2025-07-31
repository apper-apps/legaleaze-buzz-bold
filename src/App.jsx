import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import Layout from "@/components/Layout";
import Support from "@/components/pages/Support";
import Documents from "@/components/pages/Documents";
import Landing from "@/components/pages/Landing";
import Analysis from "@/components/pages/Analysis";
import LoginSignup from "@/components/pages/LoginSignup";
import Subscription from "@/components/pages/Subscription";
import Dashboard from "@/components/pages/Dashboard";
import Upload from "@/components/pages/Upload";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/analysis/:id" element={<Analysis />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;