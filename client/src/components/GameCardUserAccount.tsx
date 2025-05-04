import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GameCardUserAccountProps {
  gameId: number;
  gameName: string;
  images: string[];
  activeTab: "watchlist" | "played";
  onRemove: (gameId: number) => void;
  onAlreadyPlayed: (gameId: number) => void;
}

const GameCardUserAccount: React.FC<GameCardUserAccountProps> = ({
  gameId,
  gameName,
  images,
  activeTab,
  onRemove,
  onAlreadyPlayed,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNavigateToDetails = () => {
    navigate(`/game-details/${gameId}`); // Navigate to GameDetails with gameId
  };

  const handleRemoveFromList = () => {
    onRemove(gameId);
  };

  const handleAddToPlayed = () => {
    onAlreadyPlayed(gameId);
  };

  return (
    <div className="game-card border rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-center mb-4">{gameName}</h3>
      <div className="carousel relative" onClick={handleNavigateToDetails}>
        <img
          src={images[currentImageIndex]}
          alt={`${gameName} screenshot`}
          className="w-full h-64 object-cover rounded-lg cursor-pointer"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
          className="carousel-left-button"
        >
          &#8249;
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
          className="carousel-right-button"
        >
          &#8250;
        </button>
      </div>
      <div className="details mt-4">
        {activeTab === "watchlist" ? (
          <div className="flex justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromList();
              }}
              className="bg-red-500 text-white w-1/2 py-2 rounded-l-md hover:bg-red-600"
            >
              Remove from List
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToPlayed();
              }}
              className="already-played-button w-1/2 py-2"
            >
              Add to Already Played
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromList();
            }}
            className="bg-red-300 text-white w-full py-2 rounded-md hover:bg-red-400 focus:bg-red-400"
          >
            Remove from List
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCardUserAccount;