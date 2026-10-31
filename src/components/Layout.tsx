import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useSchoolSettings } from "../context/SchoolSettingsContext";
import { MaintenanceScreen, MaintenanceAdminBanner } from "./MaintenanceScreen";

export default function Layout() {
  const { pathname } = useLocation();
  const { settings } = useSchoolSettings();

  // Check if current user is logged in as an administrator
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return Boolean(
        localStorage.getItem("spps_admin_auth") === "true" ||
        localStorage.getItem("spps_admin_token")
      );
    } catch {
      return false;
    }
  });

  // Re-check admin status on storage change or path navigation
  useEffect(() => {
    try {
      setIsAdmin(
        Boolean(
          localStorage.getItem("spps_admin_auth") === "true" ||
          localStorage.getItem("spps_admin_token")
        )
      );
    } catch {}
  }, [pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // If site is in maintenance mode and user is not an administrator, show maintenance screen
  if (settings.maintenanceMode && !isAdmin) {
    return <MaintenanceScreen />;
  }

  return (
    <div className="site-wrapper">
      {settings.maintenanceMode && isAdmin && <MaintenanceAdminBanner />}
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
