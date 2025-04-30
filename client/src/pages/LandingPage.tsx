import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/search"); // Navigate to the SearchResult page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 text-gray-900">
      {/* Title Text */}
      <p className="text-4xl font-bold mb-12 text-center sm:text-5xl">Press</p>

      {/* Respawn Logo Button */}
      <button
        onClick={handleNavigate}
        className="w-48 h-48 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-56 sm:h-56"
      >
        <img
          src="/assets/RespawnLogoRound.png"
          alt="Respawn Logo"
          className="w-full h-full rounded-full object-contain"
        />
      </button>

      {/* Subtitle Text */}
      <p className="text-4xl font-bold mt-12 text-center sm:text-5xl">to Respawn...</p>
    </div>
  );
};

export default LandingPage;