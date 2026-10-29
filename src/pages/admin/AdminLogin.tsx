import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { SCHOOL_CONFIG } from "../../config/school";
import "./AdminLogin.css";

/* =========================================================
   ADMIN LOGIN PAGE — standalone (no Layout/Header/Footer)
   ========================================================= */

const ADMIN_USER =
  import.meta.env.VITE_ADMIN_USER?.trim() || "admin";
const ADMIN_PASS =
  import.meta.env.VITE_ADMIN_PASS?.trim() || "spps2026";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate brief async check
    setTimeout(() => {
      if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("spps_admin_auth", "true");
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* School branding */}
        <div className="admin-login-brand">
          <div className="admin-login-brand__shield">
            <ShieldAlert size={28} />
          </div>
          <h1 className="admin-login-brand__name">
            {SCHOOL_CONFIG.name.english}
          </h1>
          <p className="admin-login-brand__sub">Administration Portal</p>
        </div>

        <hr className="admin-login-divider" />

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="admin-form-field">
            <label className="admin-form-label" htmlFor="al-username">
              <User size={15} />
              Username
            </label>
            <input
              id="al-username"
              type="text"
              className="admin-form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div className="admin-form-field">
            <label className="admin-form-label" htmlFor="al-password">
              <Lock size={15} />
              Password
            </label>
            <div className="admin-form-password-wrap">
              <input
                id="al-password"
                type={showPass ? "text" : "password"}
                className="admin-form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Enter password"
              />
              <button
                type="button"
                className="admin-form-eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="admin-login-error" role="alert">
              <ShieldAlert size={15} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading || !username || !password}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="admin-login-note">
          <Lock size={13} />
          This area is for authorised school staff only.
        </p>
      </div>
    </div>
  );
}
