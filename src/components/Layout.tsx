import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

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
