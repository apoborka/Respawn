import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="mt-4 w-full flex">
      <input
        type="text"
        placeholder="Search for a game, developer, or genre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow p-2 rounded-l-md border border-gray-300"
      />
      <button
        onClick={onSearch}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;