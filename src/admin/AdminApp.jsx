import React, { createContext, useState } from "react";
import styled from "styled-components";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const AdminAppWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
`;

export const AdminContext = createContext();

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("adminAuth") === "true"
  );

  return (
    <HelmetProvider>
      <AdminContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <AdminAppWrapper>
          <Helmet>
            <title>Admin Dashboard - Revolvo Tech</title>
            <meta name="description" content="Revolvo Tech Admin Dashboard" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <Router>
            <Routes>
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/*" element={<AdminDashboard />} />
            </Routes>
          </Router>
        </AdminAppWrapper>
      </AdminContext.Provider>
    </HelmetProvider>
  );
}

export default AdminApp;