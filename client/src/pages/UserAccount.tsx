import React, { useState } from "react";
import { mockGames } from "../mockData"; // Replace with actual data fetching logic
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"watchlist" | "played">("watchlist");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for Watchlist and Played List
  const watchlistGames = mockGames.filter((game) => game.type === "watchlist");
  const playedGames = mockGames.filter((game) => game.type === "played");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Component */}
      <Header />

      {/* SearchBar */}
      <div className="flex justify-center items-center pt-22 pb-4 px-4">
        <div className="w-full max-w-5xl">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={() => console.log("Search triggered:", searchQuery)}
          />
        </div>
      </div>

      {/* Header Text */}
      <div className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wide uppercase">
        Your Lists
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
                  key={game.id}
                  gameId={game.id}
                  gameName={game.name}
                  images={game.images}
                  onWatchlist={() => console.log("Remove from Watchlist:", game.id)}
                  onAlreadyPlayed={() => console.log("Add to Played List:", game.id)}
                  onOpenLoginModal={() => console.log("Login required")}
                />
              ))
            : playedGames.map((game) => (
                <GameCard
                  key={game.id}
                  gameId={game.id}
                  gameName={game.name}
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