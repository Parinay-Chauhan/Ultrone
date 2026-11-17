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
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[340px] bg-[#141720] border border-[#242838] rounded-2xl overflow-hidden fade-up">

          {/* Top cyan accent line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#22d3ee]/30 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-[#3a4260] hover:text-[#dde2f0] hover:bg-[#1c2030] transition-colors duration-150"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="p-7">
            {/* Logo mark */}
            <div className="w-[32px] h-[32px] bg-[#1c2030] border border-[#2e3448] rounded-[8px] flex items-center justify-center mx-auto mb-5 text-[13px] font-bold text-[#22d3ee] select-none">
              U
            </div>

            {/* Title */}
            <h2 className="text-[#eef1fa] text-[18px] font-semibold text-center tracking-tight mb-1">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="text-[#5a6180] text-[13px] text-center mb-6">
              {mode === "login"
                ? "Save and access your chat history"
                : "Register to save your conversations"}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[#5a6180] text-[12px] mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  autoComplete="username"
                  autoFocus
                  className="w-full h-9 bg-[#0d0f14] border border-[#242838] hover:border-[#2e3448] focus:border-[rgba(34,211,238,0.28)] rounded-lg px-3 text-[#dde2f0] text-[13px] outline-none transition-colors duration-150 placeholder-[#3a4260] caret-[#22d3ee]"
                />
              </div>

              <div>
                <label className="block text-[#5a6180] text-[12px] mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-9 bg-[#0d0f14] border border-[#242838] hover:border-[#2e3448] focus:border-[rgba(34,211,238,0.28)] rounded-lg px-3 text-[#dde2f0] text-[13px] outline-none transition-colors duration-150 placeholder-[#3a4260] caret-[#22d3ee]"
                />
              </div>

              {error && (
                <p className="text-[#f87171] text-[12px] bg-[#f87171]/5 border border-[#f87171]/15 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-9 bg-[#22d3ee] hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-[#0d0f14] text-[13px] font-semibold transition-[opacity,transform] duration-150 mt-1 border-none cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Please wait
                  </span>
                ) : (
                  mode === "login" ? "Sign in" : "Create account"
                )}
              </button>
            </form>

            <p className="text-center text-[#3a4260] text-[12px] mt-5">
              {mode === "login" ? "No account?" : "Have an account?"}{" "}
              <button
                type="button"
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                className="text-[#22d3ee] opacity-80 hover:opacity-100 font-medium transition-opacity duration-150 bg-transparent border-none cursor-pointer text-[12px]"
              >
                {mode === "login" ? "Register" : "Sign in"}
              </button>
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-[#3a4260] hover:text-[#5a6180] text-[12px] mt-3 transition-colors duration-150 bg-transparent border-none cursor-pointer"
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
