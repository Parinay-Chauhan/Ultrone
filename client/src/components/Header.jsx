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
    <header className="w-full shrink-0 flex items-center justify-between px-4 md:px-6 py-3 border-b border-[#1f1f23] bg-[#09090b]/95 backdrop-blur-sm">

      {/* Left — Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#7c3aed]">
          <img className="w-4 h-4" src={whiterobo} alt="Ultron AI" />
        </div>
        <div>
          <span className="text-[#fafafa] text-sm font-medium">Ultron</span>
          <p className="text-[11px] text-[#52525b] leading-none mt-0.5 hidden sm:block">
            {isGuest ? "Guest session · history not saved" : "AI writing assistant"}
          </p>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* New Session */}
        <button
          onClick={handleNewSession}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#71717a] bg-[#111113] border border-[#1f1f23] hover:border-[#27272a] hover:text-[#a1a1aa] transition-colors duration-150"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New chat
        </button>

        {isGuest ? (
          <button
            id="header-login-btn"
            onClick={onLoginClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-white bg-[#7c3aed] hover:bg-[#6d28d9] transition-colors duration-150"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10,17 15,12 10,7" /><line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Sign in
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#71717a] bg-[#111113] border border-[#1f1f23] hover:border-[#ef4444]/30 hover:text-[#f87171] transition-colors duration-150"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
