import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { I18nProvider } from "./i18n";
import { SchoolSettingsProvider } from "./context/SchoolSettingsContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Facilities from "./pages/Facilities";
import Activities from "./pages/Activities";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import TeachingStaff from "./pages/TeachingStaff";
import Contribution from "./pages/Contribution";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <I18nProvider>
      <SchoolSettingsProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes wrapped in Layout (Header + Footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/teaching-staff" element={<TeachingStaff />} />
              <Route path="/contribution" element={<Contribution />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Standalone Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SchoolSettingsProvider>
    </I18nProvider>
  );
}
