import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
import Landing from "@/components/pages/Landing";
import Dashboard from "@/components/pages/Dashboard";
import Upload from "@/components/pages/Upload";
import Analysis from "@/components/pages/Analysis";
import Documents from "@/components/pages/Documents";
import Subscription from "@/components/pages/Subscription";
import Support from "@/components/pages/Support";
function App() {
  return (
<BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
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
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;