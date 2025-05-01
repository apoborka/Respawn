import { useState } from "react";

interface GameCardProps {
  gameId: number;
  gameName: string;
  images: string[];
  onFavorite: (gameId: number) => void;
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="game-card border rounded-lg shadow-lg p-4">
      {/* Game Name */}
      <h3 className="text-lg font-bold text-center mb-4">{gameName}</h3>
      <div className="carousel relative">
        <img
          src={images[currentImageIndex]}
          alt={`${gameName} screenshot`}
          className="w-full h-64 object-cover rounded-lg"
        />
        {/* Left Button */}
        <button onClick={handlePrevImage} className="carousel-left-button">
          &#8249;
        </button>
        {/* Right Button */}
        <button onClick={handleNextImage} className="carousel-right-button">
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