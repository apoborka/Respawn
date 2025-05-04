import React from "react";

interface GameCardUserAccountProps {
  gameId: number;
  gameName: string;
  images: string[];
  activeTab: "watchlist" | "played";
}

const GameCardUserAccount: React.FC<GameCardUserAccountProps> = ({
  gameId,
  gameName,
  images,
  activeTab,
}) => {
  const handleRemoveFromList = () => {
    console.log(`Remove game with ID ${gameId} from list`);
  };

  const handleAddToPlayed = () => {
    console.log(`Add game with ID ${gameId} to Played List`);
  };

  return (
    <div className="game-card border rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-center mb-4">{gameName}</h3>
      <div className="carousel relative">
        <img
          src={images[0]}
          alt={`${gameName} screenshot`}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div className="details mt-4">
        {activeTab === "watchlist" ? (
          <div className="flex justify-between">
            <button
              onClick={handleRemoveFromList}
              className="bg-red-500 text-white w-1/2 py-2 rounded-l-md hover:bg-red-600"
            >
              Remove from List
            </button>
            <button
              onClick={handleAddToPlayed}
              className="bg-purple-500 text-white w-1/2 py-2 rounded-r-md hover:bg-purple-600"
            >
              Add to Already Played
            </button>
          </div>
        ) : (
          <button
            onClick={handleRemoveFromList}
            className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600"
          >
            Remove from List
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCardUserAccount;