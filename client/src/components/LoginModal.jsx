import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginModal = ({ onClose, apiBaseUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("login"); // "login" | "register"

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
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm bg-[#111113] border border-[#1f1f23] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden fade-up">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-lg text-[#3f3f46] hover:text-[#a1a1aa] hover:bg-[#1f1f23] transition-colors duration-150"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="p-7">
            {/* Logo */}
            <div className="w-9 h-9 bg-[#7c3aed] rounded-xl flex items-center justify-center mx-auto mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-[#fafafa] text-lg font-semibold text-center tracking-tight">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="text-[#71717a] text-xs text-center mt-1.5 mb-6">
              {mode === "login"
                ? "Save and access your chat history"
                : "Register to save your conversations"}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[#71717a] text-xs mb-1.5">
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  autoComplete="username"
                  autoFocus
                  className="w-full h-10 bg-[#09090b] border border-[#1f1f23] hover:border-[#27272a] focus:border-[#3f3f46] rounded-xl px-3.5 text-[#fafafa] text-sm outline-none transition-colors duration-150 placeholder-[#2a2a2e]"
                />
              </div>

              <div>
                <label className="block text-[#71717a] text-xs mb-1.5">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-10 bg-[#09090b] border border-[#1f1f23] hover:border-[#27272a] focus:border-[#3f3f46] rounded-xl px-3.5 text-[#fafafa] text-sm outline-none transition-colors duration-150 placeholder-[#2a2a2e]"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 text-[#f87171] text-xs bg-[#f87171]/5 border border-[#f87171]/15 rounded-xl px-3.5 py-2.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white text-sm font-medium transition-colors duration-150 mt-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Please wait
                  </span>
                ) : (
                  mode === "login" ? "Sign in" : "Create account"
                )}
              </button>
            </form>

            {/* Mode toggle */}
            <p className="text-center text-[#52525b] text-xs mt-4">
              {mode === "login" ? "No account? " : "Have an account? "}
              <button
                type="button"
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                className="text-[#7c3aed] hover:text-[#8b5cf6] font-medium transition-colors duration-150"
              >
                {mode === "login" ? "Register" : "Sign in"}
              </button>
            </p>

            {/* Guest option */}
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-[#3f3f46] hover:text-[#52525b] text-xs mt-3 transition-colors duration-150"
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
