import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BiSearch } from 'react-icons/bi';

const fetchSearchResults = async (query) => {
  try {
    const res = await fetch('/api/users/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.results; // Adjust based on the actual response structure
  } catch (error) {
    throw new Error(error.message);
  }
};

const SearchBar = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: results = [], isFetching, isError } = useQuery(
    ['searchResults', searchQuery],
    () => fetchSearchResults(searchQuery),
    {
      enabled: searchQuery.length > 0, // Fetch only if searchQuery is not empty
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (result) => {
    onSelect(result);
    setSearchQuery('');
  };

  return (
    <div className="relative flex items-center bg-secondary rounded-full w-1/3 max-w-md search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-full border-none outline-none bg-background text-text"
      />
      <button type="button" className="px-4 py-2 text-accent">
        <BiSearch className="w-5 h-5" />
      </button>
      {isFetching && searchQuery.length > 0 && (
        <div className="absolute z-10 w-full bg-cardBackground rounded-lg shadow-lg mt-2 text-center text-text">
          Loading...
        </div>
      )}
      {isError && (
        <div className="absolute z-10 w-full bg-cardBackground rounded-lg shadow-lg mt-2 text-center text-text">
          Error fetching results
        </div>
      )}
      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-cardBackground rounded-lg shadow-lg mt-2">
          {results.map((result) => (
            <div
              key={result._id}
              className="px-4 py-2 text-text hover:bg-accent cursor-pointer"
              onClick={() => handleResultClick(result)}
            >
              {result.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
