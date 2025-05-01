import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignupModal from "./LoginSignupModal";
import Auth from '../utils/auth'

const Header: React.FC = () => {
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
              {Auth.loggedIn() ? (
                <button
                onClick={Auth.logout}
                className="login-button"
              >
                Logout
              </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="login-button"
                >
                  Login
                </button>
              )}
          </div>
        </div>
      </header>

      {/* Modal */}
      <LoginSignupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;