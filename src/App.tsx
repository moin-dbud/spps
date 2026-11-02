import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from "react";
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

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

class AdminRouteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error("Unable to load the administrative portal.", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Administrative portal unavailable</h1>
          <p>Please reload the page and try again.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <AdminRouteErrorBoundary>
      <Suspense fallback={<div role="status" aria-live="polite">Loading administrative portal…</div>}>
        {children}
      </Suspense>
    </AdminRouteErrorBoundary>
  );
}

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
            <Route path="/admin/login" element={<AdminRoute><AdminLogin /></AdminRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SchoolSettingsProvider>
    </I18nProvider>
  );
}
