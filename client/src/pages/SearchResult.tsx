import React from "react";
import Header from "../components/Header";
import { mockGames } from "../mockData";

const SearchResultPage: React.FC = () => {
  return (
    <div>
      <Header />
      {/* Add padding to push content below the header */}
      <div className="pt-36 p-4 max-w-7xl mx-auto">
        {/* Center the heading */}
        <h1 className="text-3xl font-bold mb-4 text-center">GAMES BEING PLAYED</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGames.map((game) => (
            <div
              key={game.id}
              className="w-full h-48 bg-gray-200 rounded-md flex flex-col items-center justify-center p-4"
            >
              <h2 className="text-lg font-bold">{game.name}</h2>
              <p className="text-sm text-gray-600">{game.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;