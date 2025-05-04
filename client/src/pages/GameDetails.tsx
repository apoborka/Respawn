// API Calls to include:

  // *Page Header*
  // *Game Name*
  // *Image Carousel* "Get screenshots for the game." (SUCCESS)
  // *Game Rating* "Get a list of games." KEY: Metacritic (SUCCESS)

  // *Game Details*
  // "Get details of the game." (SUCCESS)
  // "Get a list of DLC's for the game, GOTY and other editions, companion apps, etc." (SUCCESS)
  // "Get a list of games that are part of the same series." (SUCCESS)
  // "Get links to the stores that sell the game." (SUCCESS)

  // *Community Section*
  // "Get a list of most recent posts from the game's subreddit." (SUCCESS - MODERATION WARNING!!)

  import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_GAME } from "@/utils/mutations";
import parse from "html-react-parser";
import Auth from "../utils/auth";
import Header from "../components/Header";
import LoginSignupModal from "../components/LoginSignupModal";

interface GameDetails {
  name: string;
  description: string;
  metacriticRating: number;
  releaseDate: string;
  images: string[];
  website: string;
  esrbRating: string;
  platforms: string[];
}

const GameDetailsPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameDetails>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addGame] = useMutation(ADD_GAME);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (game?.images.length ?? 0));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (game?.images.length ?? 0)) % (game?.images.length ?? 0));
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

  const handleWatchlistClick = () => {
    if (!Auth.loggedIn()) {
      setIsModalOpen(true);
      return;
    }
    onWatchlist(Number(gameId));
  };

  const handleAlreadyPlayedClick = () => {
    if (!Auth.loggedIn()) {
      setIsModalOpen(true);
      return;
    }
    onAlreadyPlayed(Number(gameId));
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameId}?key=aff47dd8e2494bf78e8a9f0930756271`
        );
        const data = await response.json();
        const gameDetails: GameDetails = {
          name: data.name,
          description: data.description,
          metacriticRating: data.metacritic,
          releaseDate: data.released,
          images: [data.background_image],
          website: data.website,
          esrbRating: data.esrb_rating?.name || "Not Rated",
          platforms: data.platforms.map((platform: { platform: { name: string } }) => platform.platform.name),
        };
        gameDetails.description = gameDetails.description.replace(/\n/g, "<br />");
        const imgResponse = await fetch(
          `https://api.rawg.io/api/games/${gameId}/screenshots?key=aff47dd8e2494bf78e8a9f0930756271`
        );
        const imgData = await imgResponse.json();
        for (let i = 0; i < imgData.results.length; i++) {
          gameDetails.images.push(imgData.results[i].image);
        }
        setGame(gameDetails);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      {/* Add extra padding to ensure content is spaced below the header */}
      <div className="pt-28 px-4 max-w-7xl mx-auto">
        {/* Back Button and Game Name */}
        <div className="relative mb-6 flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            &larr;
          </button>

          {/* Game Name */}
          <h1 className="text-2xl font-bold text-center flex-1 mx-4 truncate">
            {game.name}
          </h1>
        </div>

        {/* Image Carousel */}
        <div className="carousel relative mb-6">
          <img
            src={game.images[currentImageIndex]}
            alt={`${game.name} screenshot`}
            className="w-full h-96 object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="carousel-left-button"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="carousel-right-button"
          >
            &#8250;
          </button>
        </div>

        {/* Watchlist and Already Played Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handleWatchlistClick}
            className="watchlist-button w-1/2 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Watchlist
          </button>
          <button
            onClick={handleAlreadyPlayedClick}
            className="already-played-button w-1/2 py-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Already Played
          </button>
        </div>

        {/* Game Details Section */}
        <div className="details mt-6 flex flex-col md:flex-row gap-4">
          {/* Game Details Box */}
          <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 break-words">
            <h2 className="text-xl font-bold mb-4">Game Details</h2>
            <p className="text-base font-medium mb-2">
              <strong>MetaCritic Rating:</strong> {game.metacriticRating}
            </p>
            <p className="text-base font-medium mb-2">
              <strong>Release Date:</strong> {game.releaseDate}
            </p>
            <p className="text-base font-medium mb-2">
              <strong>ESRB Rating:</strong> {game.esrbRating}
            </p>
            <p className="text-base font-medium mb-2">
              <strong>Platforms:</strong> {game.platforms.join(", ")}
            </p>
            <p className="text-base font-medium">
              <strong>Game Website:</strong>{" "}
              <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {game.website}
              </a>
            </p>
          </div>

          {/* Description Box */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <div className="text-base">{parse(game.description)}</div>
          </div>
        </div>
      </div>
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GameDetailsPage;