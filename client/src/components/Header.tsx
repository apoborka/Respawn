import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignupModal from "./LoginSignupModal";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
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
              onClick={handleLoginClick}
              className="login-button"
            >
              Login
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 w-full flex">
            <input
              type="text"
              placeholder="Search for a game, developer, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-2 rounded-l-md border border-gray-300"
            />
            <button
              onClick={() => console.log(`Searching for: ${searchQuery}`)} // Replace with actual search logic
              className="search-button"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Modal */}
      <LoginSignupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;