import React from "react";
import whiterobo from "../assets/white-robo.svg";

const Header = ({ isGuest = false, onLoginClick }) => {

  function handleNewSession() {
    sessionStorage.removeItem('chat_session_id');
    window.location.reload();
  }

  const handleLogout = () => {
    sessionStorage.removeItem('chat_session_id');
    localStorage.removeItem('mejor_session_token');
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://mejor-backend.onrender.com');
    window.location.href = `${API_BASE_URL}/logout`;
  };

  return (
    <header className="w-full shrink-0 h-14 border-b border-[#1e1e1e] bg-[#0c0c0c]">
      <div className="max-w-3xl mx-auto flex items-center justify-between h-full px-6">

      {/* Left — Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#f0f0f0] flex items-center justify-center shrink-0">
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#0a0a0a] text-xs font-semibold leading-none select-none">U</span>
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#d8d8d8] text-base font-semibold tracking-tight">
          Ultrone
        </span>
        {isGuest && (
          <span className="hidden sm:inline text-[11px] text-[#333] bg-[#161616] border border-[#222] px-2 py-0.5 rounded-full">
            guest
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleNewSession}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] text-[#555] hover:text-[#999] hover:bg-[#161616] transition-colors duration-100"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New chat
        </button>

        {isGuest ? (
          <button
            id="header-login-btn"
            onClick={onLoginClick}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#0a0a0a] bg-[#e8e8e8] hover:bg-white transition-colors duration-100"
          >
            Sign in
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-[13px] text-[#555] hover:text-[#999] hover:bg-[#161616] transition-colors duration-100"
          >
            Sign out
          </button>
        )}
      </div>
      </div>
    </header>
  );
};

export default Header;
