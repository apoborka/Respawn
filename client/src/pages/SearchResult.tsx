import React, { use } from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { Game } from "@/models/Games";
import { rawgAPI } from "@/models/RawgAPI";



const SearchResultPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=aff47dd8e2494bf78e8a9f0930756271&search_exact=true&metacritic=90,100`
        );
        const data = await response.json();
        const defaultGames = data.results.map((game: rawgAPI) => ({
          gameId: game.id,
          gameName: game.name,
          image: game.background_image,
        }))
        setGames(defaultGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
  
    fetchGames();
  }, [])

  return (
    <div>
      <Header />
      {/* Add padding to push content below the header */}
      <div className="pt-36 p-4 max-w-7xl mx-auto">
        {/* Center the heading */}
        <h1 className="text-3xl font-bold mb-4 text-center">GAMES BEING PLAYED</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.gameId}
              className="w-full h-48 bg-gray-200 rounded-md flex flex-col items-center justify-center p-4"
            >
              <h2 className="text-lg font-bold">{game.gameName}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;