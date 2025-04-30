import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full bg-primary text-primary-foreground shadow-md z-10">
      <div className="flex flex-col items-center p-4 max-w-7xl mx-auto">
        {/* Top Row: Logo, Title, and Login Button */}
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/assets/RespawnLogoRound.png"
              alt="Respawn Logo"
              className="w-12 h-12 mr-2 rounded-full"
            />
            <span className="text-xl font-bold whitespace-nowrap">Respawn</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="ml-4 px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-primary transition"
          >
            Login
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 w-full">
          <input
            type="text"
            placeholder="Search for a game, developer, or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;