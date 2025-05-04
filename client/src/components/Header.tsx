import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginSignupModal from "./LoginSignupModal";
import Auth from "../utils/auth";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

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
          {/* Top Row: Logo, Title, and Buttons */}
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
            <div className="flex items-center gap-4">
              {Auth.loggedIn() ? (
                <>
                  {/* Conditionally Render Button */}
                  {location.pathname === "/account" ? (
                    <button
                      onClick={() => navigate("/search")}
                      className="account-button"
                    >
                      Back to Search
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/account")}
                      className="account-button"
                    >
                      Account
                    </button>
                  )}
                  {/* Logout Button */}
                  <button
                    onClick={Auth.logout}
                    className="login-button"
                  >
                    Logout
                  </button>
                </>
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
        </div>
        {/* Animated Bar */}
        <div className="animated-bar w-full h-2"></div>
      </header>

      {/* Modal */}
      <LoginSignupModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;