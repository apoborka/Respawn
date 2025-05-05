import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_GAME } from "@/utils/mutations";
import Auth from "@/utils/auth";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GameCard from "@/components/GameCard";
import LoginSignupModal from "../components/LoginSignupModal";
import { Game } from "@/models/Games";
import { rawgAPI, shortScreenshots } from "@/models/RawgAPI";
import Footer from "../components/Footer";

const SearchResultPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false); // Track if search is submitted
  const [isModalOpen, setIsModalOpen] = useState(false); // State for login modal
  const [addGame] = useMutation(ADD_GAME);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearchSubmitted(true); // Mark search as submitted
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
      setGames(searchGames);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const onWatchlist = async (gameId: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const gameToSave = {
      gameId,
      played: false,
    };
    try {
      const result = await addGame({ variables: { input: { ...gameToSave } } });
      if (!result) {
        throw new Error("Error With Mongoose");
      }
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  const onAlreadyPlayed = async (gameId: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const gameToSave = {
      gameId,
      played: true,
    };
    try {
      const result = await addGame({ variables: { input: { ...gameToSave } } });
      if (!result) {
        throw new Error("Error With Mongoose");
      }
    } catch (err) {
      console.log(err);
    }
    return true;
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
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Wrapper for centering the SearchBar */}
      <div className="flex justify-center items-center pt-22 pb-4 px-4">
        <div className="w-full max-w-5xl">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <div className="pt-4 p-4 max-w-7xl mx-auto flex-grow">
        {/* Dynamically update the heading based on isSearchSubmitted */}
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wide uppercase">
          {isSearchSubmitted ? "YOUR SEARCH RESULTS" : "TOP GAMES TODAY"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.gameId}
              gameId={game.gameId}
              gameName={game.gameName}
              images={game.images}
              onWatchlist={onWatchlist}
              onAlreadyPlayed={onAlreadyPlayed}
              onOpenLoginModal={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      </div>
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default SearchResultPage;