import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    if (location.pathname === '/favorites') {
      navigate('/');
    } else {
      navigate('/favorites');
    }
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 z-40 flex flex-col justify-between`}
      >
        <div className="p-6">
          <Link
            to="/"
            className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center mb-12 animate-pulse"
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-2 text-3xl">🌍</span> Explorer
          </Link>
          <nav className="space-y-4">
            <Link
              to="/"
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                isActive('/')
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <button
              onClick={handleFavoritesClick}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 w-full text-left ${
                isActive('/favorites')
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              Favorites
            </button>
          </nav>
        </div>
        <div className="p-6">
          <button
            onClick={toggleDarkMode}
            className="flex items-center p-3 rounded-lg w-full text-left text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  darkMode
                    ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                    : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                }
              />
            </svg>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;