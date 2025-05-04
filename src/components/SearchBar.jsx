import { useState, useEffect } from 'react';

function SearchBar({ search, setSearch }) {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setSearch('');
      return;
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, setSearch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <svg
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        className="input pl-14"
        placeholder="Search countries..."
        value={search}
        onChange={handleChange}
      />
      {isTyping && (
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
          <svg
            className="animate-spin h-6 w-6 text-purple-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default SearchBar;