import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Topbar from "./components/Topbar.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import InfoSection from "./components/InfoSection.jsx";
import Aboutus1 from "./components/Aboutus1.jsx";
import ContactUs from "./components/ContactUs.jsx";
import BookTable from "./components/BookTable.jsx";
import BlogSection from "./components/BlogSection.jsx";
import Menuu from "./components/Menuu.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import AboutUs from "./components/AboutUs.jsx";
import OrderApps from "./components/OrderApps.jsx";
import ReadMoreArticles from "./components/ReadMoreArticles.jsx";
import MenuSection from "./components/MenuSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";

// Auth Provider & route guards
import { AuthProvider } from "./Auth/AuthContext.jsx";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import RequireRole from "./Auth/RequireRole.jsx";

// Admin pieces 
import AdminLayout from "./Auth/AdminLayout.jsx";
import Dashboard from "./Auth/Dashboard.jsx";
import Users from "./Auth/Users.jsx";
import AdminMenu from "./Auth/AdminMenu.jsx";
import AdminBookings from "./Auth/AdminBookings.jsx";
import Settings from "./Auth/Settings.jsx";

// Customer pieces
import Profile from "./components/Profile.jsx";
import MyBookings from "./components/MyBookings.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Topbar />
        <Navbar />

        <Routes>
          {/* Public authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
                <Footer />
              </ProtectedRoute>
            }
          />

          {/* Admin protected routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <RequireRole role="admin">
                  <AdminLayout />
                </RequireRole>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Public pages */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MenuSection />
                <AboutSection />
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Aboutus1 />
                <AboutUs />
                <InfoSection />
                <TestimonialsSection />
                <Footer />
              </>
            }
          />

          <Route
            path="/menu"
            element={
              <>
                <Menuu />
                <OrderApps />
                <Footer />
              </>
            }
          />

          <Route
            path="/pages"
            element={
              <>
                <BlogSection />
                <Footer />
              </>
            }
          />

          <Route
            path="/book-table"
            element={
              <>
                <BookTable />
                <Footer />
              </>
            }
          />

          <Route path="/ReadMoreArticles" element={<ReadMoreArticles />} />

          <Route
            path="/contact"
            element={
              <>
                <ContactUs />
                <Footer />
              </>
            }
          />

          {/* Errors */}
          <Route
            path="/403"
            element={
              <div className="max-w-md mx-auto py-24 text-center space-y-4">
                <h2 className="text-3xl font-bold font-serif text-destructive">403 — Not Authorized</h2>
                <p className="text-muted-foreground text-sm">You do not have permission to view this page.</p>
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="max-w-md mx-auto py-24 text-center space-y-4">
                <h2 className="text-3xl font-bold font-serif text-foreground">404 — Page Not Found</h2>
                <p className="text-muted-foreground text-sm">The requested page does not exist.</p>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
