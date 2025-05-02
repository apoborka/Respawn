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
  import { useParams } from "react-router-dom";
  import parse from "html-react-parser";
  import Auth from "../utils/auth";
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
    const { gameId } = useParams<{ gameId: string }>(); // Get gameId from URL
    const [game, setGame] = useState<GameDetails>();
    const [isModalOpen, setIsModalOpen] = useState(false); // State for login modal

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (game?.images.length ?? 0));
    };
  
    const handlePrevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (game?.images.length ?? 0)) % (game?.images.length ?? 0));
    };

    const onWatchlist = (gameId: number) => {
      console.log(`Game with ID ${gameId} added to Watchlist`);
    };
  
    const onAlreadyPlayed = (gameId: number) => {
      console.log(`Game with ID ${gameId} marked as Already Played`);
    };

    const handleWatchlistClick = () => {
      if (!Auth.loggedIn()) {
        setIsModalOpen(true); // Open the login modal if the user is not authenticated
        return;
      }
      onWatchlist(Number(gameId)); // Call the onWatchlist function if authenticated
    };
  
    const handleAlreadyPlayedClick = () => {
      if (!Auth.loggedIn()) {
        setIsModalOpen(true); // Open the login modal if the user is not authenticated
        return;
      }
      onAlreadyPlayed(Number(gameId)); // Call the onAlreadyPlayed function if authenticated
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
          gameDetails.description = gameDetails.description.replace(/\n/g, '<br />'); // Remove new line characters
          // Fetch additional images
          const img_response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=aff47dd8e2494bf78e8a9f0930756271`)
          const img_data = await img_response.json();
          for (let i = 0; i < img_data.results.length; i++) {
            gameDetails.images.push(img_data.results[i].image);
          }
          setGame(gameDetails);
        } catch (error) {
          console.error("Error fetching game details:", error);
        }
      }

      fetchGameDetails();
    }, [])

    if (!game) {
      return <div>Loading...</div>; // Show a loading state while fetching data
    }
  
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">{game?.name}</h1>
        <div className="carousel relative">
        <img
          src={game?.images[currentImageIndex]}
          alt={`${game?.name} screenshot`}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
        />
        {/* Left Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating to the parent
            handlePrevImage();
          }}
          className="carousel-left-button"
        >
          &#8249;
        </button>
        {/* Right Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating to the parent
            handleNextImage();
          }}
          className="carousel-right-button"
        >
          &#8250;
        </button>
        <div className="details mt-4">
        <div className="flex justify-between mt-2">
          <button
            onClick={handleWatchlistClick}
            className="watchlist-button w-1/2 py-2"
          >
            Watchlist
          </button>
          <button
            onClick={handleAlreadyPlayedClick}
            className="already-played-button w-1/2 py-2"
          >
            Already Played
          </button>
        </div>
      </div>
        <div className="text-lg ">{parse(game?.description || "")}</div>
        <p className="text-lg font-medium mt-4">MetaCritic Rating: {game?.metacriticRating}</p>
        <p className="text-lg font-medium">Release Date: {game?.releaseDate}</p>
        <p className="text-lg font-medium">ESRB Rating: {game?.esrbRating}</p>
        <p className="text-lg font-medium">Platforms: {game?.platforms.join(", ")}</p>
        <p className="text-lg font-medium">Game Website:
          <a href={game?.website} target='_blank'>{game?.website}</a>
        </p>
      </div>
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  };
  
  export default GameDetailsPage;