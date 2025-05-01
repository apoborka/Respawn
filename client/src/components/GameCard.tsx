import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  gameId: number;
  gameName: string;
  images: string[];
  onWatchlist: (gameId: number) => void;
  onAlreadyPlayed: (gameId: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  gameId,
  gameName,
  images,
  onWatchlist,
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

  return (
    <div className="game-card border rounded-lg shadow-lg p-4">
      {/* Game Name */}
      <h3 className="text-lg font-bold text-center mb-4">{gameName}</h3>
      <div className="carousel relative" onClick={handleNavigateToDetails}>
        <img
          src={images[currentImageIndex]}
          alt={`${gameName} screenshot`}
          className="w-full h-64 object-cover rounded-lg cursor-pointer"
        />
        {/* Left Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating to the parent
            handlePrevImage();
          }}
          className="carousel-left-button"
        >
          &#8249;
        </button>
        {/* Right Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating to the parent
            handleNextImage();
          }}
          className="carousel-right-button"
        >
          &#8250;
        </button>
      </div>
      <div className="details mt-4">
        {/* Watchlist and Already Played Buttons */}
        <div className="flex justify-between mt-2">
          <button
            onClick={() => onWatchlist(gameId)}
            className="watchlist-button w-1/2 py-2"
          >
            Watchlist
          </button>
          <button
            onClick={() => onAlreadyPlayed(gameId)}
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