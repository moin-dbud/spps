import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { MaintenanceScreen } from "./MaintenanceScreen";

export default function Layout() {
  const { pathname } = useLocation();
  const { settings } = useSchoolSettings();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // If site is in maintenance mode, show maintenance screen on all public routes
  if (settings.maintenanceMode) {
    return <MaintenanceScreen />;
  }

  return (
    <div className="site-wrapper">
      <Header />
      <main
        id="main-content"
        key={pathname}
        className="page-transition"
        tabIndex={-1}
        style={{ paddingTop: "var(--nav-h)" }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
