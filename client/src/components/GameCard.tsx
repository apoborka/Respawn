import { useState } from 'react';

interface GameCardProps {
  gameId: string;
  gameName: string;
  images: string[]; // "Get screenshots for the game."
  description: string; // "Get details of the game."
  onFavorite: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ gameId, gameName, images, description, onFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleFavorite = () => {
    onFavorite(gameId);
  };

  return (
    <div className="game-card border rounded-lg shadow-lg p-4">
      <div className="carousel relative">
        <img
          src={images[currentImageIndex]}
          alt={`${gameName} screenshot`}
          className="w-full h-64 object-cover rounded-lg"
        />
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#8249;
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#8250;
        </button>
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-yellow-400 text-black p-2 rounded-full"
        >
          ★
        </button>
      </div>
      <div className="details mt-4">
        <h3 className="text-lg font-bold">{gameName}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default GameCard;