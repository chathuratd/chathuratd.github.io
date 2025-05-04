import { useFavorites } from '../hooks/useFavorites';
import { useState, useEffect } from 'react';

function FavoriteButton({ country }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [localFavorite, setLocalFavorite] = useState(isFavorite(country.cca3));

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLocalFavorite(!localFavorite);
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  useEffect(() => {
    setLocalFavorite(isFavorite(country.cca3));
  }, [isFavorite, country.cca3]);

  return (
    <button
      onClick={handleClick}
      className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-lg shadow-lg transform transition-all duration-300
        ${
          localFavorite
            ? 'bg-gold-100/90 dark:bg-gold-900/90 text-gold-600 dark:text-gold-300'
            : 'bg-white/90 dark:bg-gray-700/90 text-gray-500 dark:text-gray-300'
        } hover:bg-gold-200 dark:hover:bg-gold-800/90 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50`}
      aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={localFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={localFavorite ? '0' : '2'}
        className={`w-6 h-6 transition-transform duration-300 ${
          localFavorite ? 'text-gold-500 dark:text-gold-400' : ''
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  );
}

export default FavoriteButton;