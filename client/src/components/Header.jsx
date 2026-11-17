import React from "react";

const Header = ({ isGuest = false, onLoginClick }) => {

  function handleNewSession() {
    sessionStorage.removeItem('chat_session_id');
    window.location.reload();
  }

  const handleLogout = () => {
    sessionStorage.removeItem('chat_session_id');
    localStorage.removeItem('mejor_session_token');
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://mejor-backend.onrender.com');
    try {
      fetch(`${API_BASE_URL}/api/v1/users/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    } catch {}
    window.location.href = window.location.origin;
  };

  return (
    <header className="w-full shrink-0 h-[52px] border-b border-[#242838] bg-[#0d0f14]/90 backdrop-blur-[10px] sticky top-0 z-50">
      <div className="max-w-[840px] mx-auto flex items-center justify-between h-full px-5 sm:px-6">

        {/* Brand */}
        <div className="flex items-center gap-[9px] text-[14px] font-semibold tracking-[-0.01em] text-[#dde2f0]">
          <div className="w-[28px] h-[28px] bg-[#1c2030] border border-[#2e3448] rounded-[7px] flex items-center justify-center text-[12px] font-bold text-[#22d3ee] shrink-0 select-none">
            U
          </div>
          Ultrone
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewSession}
            className="flex items-center gap-[5px] px-3 py-[5px] bg-transparent border-none text-[#5a6180] text-[13px] font-normal cursor-pointer rounded-md hover:text-[#dde2f0] hover:bg-[#1c2030] transition-colors duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New chat
          </button>

          <div className="w-px h-[18px] bg-[#242838]" />

          {isGuest ? (
            <button
              id="header-login-btn"
              onClick={onLoginClick}
              className="px-[14px] py-[5px] bg-transparent border border-[#2e3448] text-[#dde2f0] text-[13px] font-medium cursor-pointer rounded-md hover:border-[rgba(34,211,238,0.28)] hover:bg-[rgba(34,211,238,0.10)] transition-colors duration-150"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-[14px] py-[5px] bg-transparent border border-[#2e3448] text-[#dde2f0] text-[13px] font-medium cursor-pointer rounded-md hover:border-[rgba(34,211,238,0.28)] hover:bg-[rgba(34,211,238,0.10)] transition-colors duration-150"
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
