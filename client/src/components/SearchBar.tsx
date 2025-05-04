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
        placeholder="Search for a game..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow p-2 rounded-l-md border border-gray-300 bg-gray-200 text-black placeholder-gray-500"
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