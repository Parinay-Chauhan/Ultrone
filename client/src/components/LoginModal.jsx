import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginModal = ({ onClose, apiBaseUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username and password are both required.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const endpoint = mode === "login"
        ? `${apiBaseUrl}/api/v1/users/login`
        : `${apiBaseUrl}/api/v1/users/register`;
      const { data } = await axios.post(endpoint, { username: username.trim(), password });
      const token = data.data?.sessionToken || data.data?.accessToken;
      if (token) localStorage.setItem("mejor_session_token", token);
      sessionStorage.removeItem("chat_session_id");
      window.location.reload();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xs bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden fade-up">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-lg text-[#2a2a2a] hover:text-[#555] hover:bg-[#161616] transition-colors duration-100"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="p-6">
            {/* Logo mark */}
            <div className="w-8 h-8 rounded-lg bg-[#f0f0f0] flex items-center justify-center mx-auto mb-5">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#0a0a0a] text-sm font-semibold leading-none">U</span>
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#f0f0f0] text-lg font-semibold text-center tracking-tight">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="text-[#404040] text-xs text-center mt-1.5 mb-6">
              {mode === "login"
                ? "Save and access your chat history"
                : "Register to save your conversations"}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[#404040] text-xs mb-1.5">Username</label>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  autoComplete="username"
                  autoFocus
                  className="w-full h-9 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#222] focus:border-[#2a2a2a] rounded-lg px-3 text-[#f0f0f0] text-sm outline-none transition-colors duration-100 placeholder-[#222]"
                />
              </div>

              <div>
                <label className="block text-[#404040] text-xs mb-1.5">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-9 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#222] focus:border-[#2a2a2a] rounded-lg px-3 text-[#f0f0f0] text-sm outline-none transition-colors duration-100 placeholder-[#222]"
                />
              </div>

              {error && (
                <p className="text-[#f87171] text-xs bg-[#f87171]/5 border border-[#f87171]/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-9 bg-[#f0f0f0] hover:bg-white active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-[#0a0a0a] text-sm font-medium transition-colors duration-100 mt-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Please wait
                  </span>
                ) : (
                  mode === "login" ? "Sign in" : "Create account"
                )}
              </button>
            </form>

            <p className="text-center text-[#2a2a2a] text-xs mt-5">
              {mode === "login" ? "No account?" : "Have an account?"}{" "}
              <button
                type="button"
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                className="text-[#555] hover:text-[#737373] transition-colors duration-100"
              >
                {mode === "login" ? "Register" : "Sign in"}
              </button>
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-[#222] hover:text-[#333] text-xs mt-3 transition-colors duration-100"
            >
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
