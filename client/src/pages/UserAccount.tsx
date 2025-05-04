import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import { Game } from "../models/Games"

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"watchlist" | "played">("watchlist");
  const [watchlistGames, setWatchlistGames] = useState<Game[]>([]);
  const [playedGames, setPlayedGames] = useState<Game[]>([]);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me
  useEffect(() => {
    const fetchGameDetails = async () => {
      const watchlist = [];
      const played = [];
      for(const game of userData.savedGames){
        const response = await fetch(`https://api.rawg.io/api/games/${game.gameId}?key=aff47dd8e2494bf78e8a9f0930756271`);
        const data = await response.json()
        const gameRec: Game = {
          gameId: game.gameId,
          gameName: data.name,
          images: [data.background_image]
        }
        const imgResponse = await fetch(
          `https://api.rawg.io/api/games/${game.gameId}/screenshots?key=aff47dd8e2494bf78e8a9f0930756271`
        );
        const imgData = await imgResponse.json();
        for (let i = 0; i < imgData.results.length; i++) {
          gameRec.images.push(imgData.results[i].image);
        }
        if(game.played === false){
          watchlist.push(gameRec)
        }else{
          played.push(gameRec)
        }
      }
      setWatchlistGames(watchlist)
      setPlayedGames(played)
  }
  fetchGameDetails();
  },[userData])

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Component */}
      <Header />

      {/* Header Text */}
      <div className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wide uppercase">
        {userData.username}'s Lists
      </div>

      {/* Tabs for Watchlist and Played List */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("watchlist")}
          className={`px-6 py-2 font-bold ${
            activeTab === "watchlist"
              ? "bg-[#34d399] text-white" // Matches Watchlist button color
              : "bg-gray-200 text-gray-700"
          } rounded-l-md transition-colors duration-300`}
        >
          Watchlist
        </button>
        <button
          onClick={() => setActiveTab("played")}
          className={`px-6 py-2 font-bold ${
            activeTab === "played"
              ? "bg-[#a78bfa] text-white" // Matches Played List button color
              : "bg-gray-200 text-gray-700"
          } rounded-r-md transition-colors duration-300`}
        >
          Played List
        </button>
      </div>

      {/* GameCard Container */}
      <div className="p-4 max-w-7xl mx-auto flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "watchlist"
            ? watchlistGames.map((game) => (
                <GameCard
                  gameId={game.gameId}
                  gameName={game.gameName}
                  images={game.images}
                  onWatchlist={() => console.log("Remove from Watchlist:", game.id)}
                  onAlreadyPlayed={() => console.log("Add to Played List:", game.id)}
                  onOpenLoginModal={() => console.log("Login required")}
                />
              ))
            : playedGames.map((game) => (
                <GameCard
                  gameId={game.gameId}
                  gameName={game.gameName}
                  images={game.images}
                  onWatchlist={() => console.log("Add to Watchlist:", game.id)}
                  onAlreadyPlayed={() => console.log("Remove from Played List:", game.id)}
                  onOpenLoginModal={() => console.log("Login required")}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;