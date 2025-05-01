import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import GameCard from "@/components/GameCard";
import { Game } from "@/models/Games";
import { rawgAPI, shortScreenshots } from "@/models/RawgAPI";

const SearchResultPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery) return; // Prevent empty searches
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=aff47dd8e2494bf78e8a9f0930756271&search_precise=true&search=${searchQuery}`
      );
      const data = await response.json();
      const searchGames = data.results.map((game: rawgAPI) => ({
        gameId: game.id,
        gameName: game.name,
        images: game.short_screenshots.map((image: shortScreenshots) => image.image),
      }));
      // Uncomment and fix sorting logic if needed
      searchGames.sort((a: Game, b: Game) => {
        const nameA = a.gameName.toLowerCase();
        const nameB = b.gameName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setGames(searchGames);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const onWatchlist = (gameId: number) => {
    console.log(`Game with ID ${gameId} added to Watchlist`);
  };

  const onAlreadyPlayed = (gameId: number) => {
    console.log(`Game with ID ${gameId} marked as Already Played`);
  };

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
          images: game.short_screenshots.map((image: shortScreenshots) => image.image),
        }));
        setGames(defaultGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <Header />
      {/* Add padding to push content below the header */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className="pt-36 p-4 max-w-7xl mx-auto">
        {/* Center the heading */}
        <h1 className="text-3xl font-bold mb-4 text-center">GAMES BEING PLAYED</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.gameId}
              gameId={game.gameId}
              gameName={game.gameName}
              images={game.images}
              onFavorite={(gameId) => console.log(`Favorited game with ID: ${gameId}`)}
              onWatchlist={onWatchlist} // Pass the onWatchlist function
              onAlreadyPlayed={onAlreadyPlayed} // Pass the onAlreadyPlayed function
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;