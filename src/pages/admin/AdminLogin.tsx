import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SCHOOL_CONFIG } from "../../config/school";
import { apiLogin } from "../../utils/api";
import "./AdminLogin.css";

/* =========================================================
   ADMIN LOGIN PAGE — Connected to Secure Server Endpoint
   ========================================================= */

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await apiLogin(username.trim(), password);
      if (res.success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(res.error || "Invalid username or password. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Unable to reach server. Please try again.");
    } finally {
      setLoading(false);
    }
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
              Username
            </label>
            <div className="admin-input-wrap">
              <User size={16} className="admin-input-icon" aria-hidden />
              <input
                id="al-username"
                type="text"
                className="admin-input"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="admin-form-field">
            <label className="admin-form-label" htmlFor="al-password">
              Password
            </label>
            <div className="admin-input-wrap">
              <Lock size={16} className="admin-input-icon" aria-hidden />
              <input
                id="al-password"
                type={showPass ? "text" : "password"}
                className="admin-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="admin-pass-toggle"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error alert */}
          {error && (
            <div className="admin-login-error" role="alert">
              <ShieldAlert size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary admin-login-btn"
            disabled={loading}
          >
            {loading ? "Verifying Credentials…" : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Restricted access for authorized school personnel only.</p>
        </div>
      </div>

      <div className="admin-login-back">
        <Link to="/">
          <ArrowLeft size={14} /> Return to School Homepage
        </Link>
      </div>
    </div>
  );
}
