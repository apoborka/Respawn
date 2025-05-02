import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

interface GameCardProps {
  gameId: number;
  gameName: string;
  images: string[];
  onWatchlist: (gameId: number) => void;
  onAlreadyPlayed: (gameId: number) => void;
  onOpenLoginModal: () => void; // New prop to open the login modal
}

const GameCard: React.FC<GameCardProps> = ({
  gameId,
  gameName,
  images,
  onWatchlist,
  onAlreadyPlayed,
  onOpenLoginModal,
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

  const handleWatchlistClick = () => {
    if (!Auth.loggedIn()) {
      onOpenLoginModal(); // Open the login modal if the user is not authenticated
      return;
    }
    onWatchlist(gameId); // Call the onWatchlist function if authenticated
  };

  const handleAlreadyPlayedClick = () => {
    if (!Auth.loggedIn()) {
      onOpenLoginModal(); // Open the login modal if the user is not authenticated
      return;
    }
    onAlreadyPlayed(gameId); // Call the onAlreadyPlayed function if authenticated
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
        <div className="flex justify-between mt-2">
          <button
            onClick={handleWatchlistClick}
            className="watchlist-button w-1/2 py-2"
          >
            Watchlist
          </button>
          <button
            onClick={handleAlreadyPlayedClick}
            className="already-played-button w-1/2 py-2"
          >
            Already Played
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;