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

  import React from "react";
  import { mockGames } from "../mockData";
  
  const GameDetailsPage: React.FC = () => {
    const game = mockGames[0]; // Use the first game as an example
  
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
        <div className="mb-4">
          <img
            src={game.images[0]}
            alt={`${game.name} screenshot`}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        <p className="text-lg">{game.description}</p>
        <p className="text-lg font-medium mt-4">Rating: {game.rating}</p>
      </div>
    );
  };
  
  export default GameDetailsPage;