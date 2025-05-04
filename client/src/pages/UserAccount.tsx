import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import GameCardUserAccount from "../components/GameCardUserAccount";
import { Game } from "../models/Games";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_GAME, REMOVE_GAME } from '../utils/mutations';

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"watchlist" | "played">("watchlist");
  const [watchlistGames, setWatchlistGames] = useState<Game[]>([]);
  const [playedGames, setPlayedGames] = useState<Game[]>([]);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me;
  const [addGame] = useMutation(ADD_GAME);
  const [removeGame] = useMutation(REMOVE_GAME);

  const onAlreadyPlayed = async (gameId: number) => {
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

    const onRemove = async (gameId: number) => {
      try{
        const result = await removeGame({variables: {gameId}})
        if (!result) {
          throw new Error('Error With Mongoose')
        }
      }catch(err) {
        console.log(err);
      }
      return true
    }

  useEffect(() => {
    const fetchGameDetails = async () => {
      const watchlist = [];
      const played = [];
      for (const game of userData.savedGames) {
        const response = await fetch(
          `https://api.rawg.io/api/games/${game.gameId}?key=aff47dd8e2494bf78e8a9f0930756271`
        );
        const data = await response.json();
        const gameRec: Game = {
          gameId: game.gameId,
          gameName: data.name,
          images: [data.background_image],
        };
        const imgResponse = await fetch(
          `https://api.rawg.io/api/games/${game.gameId}/screenshots?key=aff47dd8e2494bf78e8a9f0930756271`
        );
        const imgData = await imgResponse.json();
        for (let i = 0; i < imgData.results.length; i++) {
          gameRec.images.push(imgData.results[i].image);
        }
        if (game.played === false) {
          watchlist.push(gameRec);
        } else {
          played.push(gameRec);
        }
      }
      setWatchlistGames(watchlist);
      setPlayedGames(played);
    };
    if (userData) fetchGameDetails();
  }, [userData]);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="flex flex-col min-h-screen pt-28">
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
              ? "bg-[#34d399] text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-l-md transition-colors duration-300`}
        >
          Watchlist
        </button>
        <button
          onClick={() => setActiveTab("played")}
          className={`px-6 py-2 font-bold ${
            activeTab === "played"
              ? "bg-[#a78bfa] text-white"
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
                <GameCardUserAccount
                  key={game.gameId}
                  gameId={game.gameId}
                  gameName={game.gameName}
                  images={game.images}
                  activeTab="watchlist"
                  onAlreadyPlayed={onAlreadyPlayed}
                  onRemove={onRemove}
                />
              ))
            : playedGames.map((game) => (
                <GameCardUserAccount
                  key={game.gameId}
                  gameId={game.gameId}
                  gameName={game.gameName}
                  images={game.images}
                  activeTab="played"
                  onAlreadyPlayed={onAlreadyPlayed}
                  onRemove={onRemove}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;