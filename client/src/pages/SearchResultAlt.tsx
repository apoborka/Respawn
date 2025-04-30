// TODO: Paginate: 10 Game Cards per page.

import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import GameCard from './GameCard';

const GET_GAMES_QUERY = gql`
  query GetGames($search: String!, $limit: Int!, $offset: Int!) {
    games(search: $search, limit: $limit, offset: $offset) {
      id
      name
      images
      description
    }
  }
`;

const SearchResult: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const { loading, error, data, refetch } = useQuery(GET_GAMES_QUERY, {
    variables: {
      search: searchTerm,
      limit: resultsPerPage,
      offset: (currentPage - 1) * resultsPerPage,
    },
    skip: !searchTerm, // Skip query until a search term is provided
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleFavorite = (gameId: string) => {
    console.log(`Game ${gameId} favorited!`);
    // Add logic to handle favoriting a game
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="search-result">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-2">
          Search
        </button>
      </form>

      <div className="game-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.games.map((game: any) => (
          <GameCard
            key={game.id}
            gameId={game.id}
            gameName={game.name}
            images={game.images}
            description={game.description}
            onFavorite={handleFavorite}
          />
        ))}
      </div>

      <div className="pagination mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black p-2 rounded-lg mx-2"
        >
          Previous
        </button>
        <span className="p-2">{`Page ${currentPage}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={data?.games.length < resultsPerPage}
          className="bg-gray-300 text-black p-2 rounded-lg mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResult;