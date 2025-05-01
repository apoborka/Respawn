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

  const handleSearch = async () => {
    if (!searchQuery) return; // Prevent empty searches
    const response = await fetch(
      `https://api.rawg.io/api/games?key=aff47dd8e2494bf78e8a9f0930756271&search_exact=true&search=${searchQuery}`
    )
    console.log(response);
  }
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
              className="ml-4 px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-red-500 transition"
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
              onClick={() => handleSearch()} // Replace with actual search logic
              className="px-4 py-2 bg-primary text-white border border-white hover:text-red-500 hover:bg-primary-dark transition"
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