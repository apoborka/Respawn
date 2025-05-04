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



const SearchResultPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for login modal
  const [addGame] = useMutation(ADD_GAME);

  const handleSearch = async () => {
    if (!searchQuery) return;
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
      played: false
    }
    try{
      const result = await addGame({variables: {input:{...gameToSave}}})
      if (!result) {
        throw new Error('Error With Mongoose')
      }
    }catch(err) {
      console.log(err);
    }
    return true
  };

  const onAlreadyPlayed = async (gameId: number) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const gameToSave = {
      gameId,
      played: true
    }
    try{
      const result = await addGame({variables: {input:{...gameToSave}}})
      if (!result) {
        throw new Error('Error With Mongoose')
      }
    }catch(err) {
      console.log(err);
    }
    return true
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
      <div className="pt-20 p-4 max-w-7xl mx-auto">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>
      <div className="pt-8 p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">GAMES BEING PLAYED</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.gameId}
              gameId={game.gameId}
              gameName={game.gameName}
              images={game.images}
              onWatchlist={onWatchlist}
              onAlreadyPlayed={onAlreadyPlayed}
              onOpenLoginModal={() => setIsModalOpen(true)} // Pass function to open modal
            />
          ))}
        </div>
      </div>
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SearchResultPage;