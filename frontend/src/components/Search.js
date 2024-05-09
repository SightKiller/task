import React from 'react';

const Search = ({ onSearchTermChange }) => {
  return (
    <div className="relative w-64">
        <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-shadow duration-200 ease-in-out hover:shadow-lg"
            onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-500 transition-colors duration-200 ease-in-out hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    </div>
);
}
export default Search;
