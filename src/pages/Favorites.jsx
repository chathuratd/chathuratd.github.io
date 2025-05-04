import { useFavorites } from '../hooks/useFavorites';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          My Favorite Countries
        </h1>
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No favorite countries added yet. Start exploring!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        My Favorite Countries
      </h1>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {favorites.map((country) => (
          <div key={country.cca3} className="card group relative mb-6 break-inside-avoid animate-bounce-in">
            <button
              onClick={() => removeFavorite(country.cca3)}
              className="absolute top-4 right-4 p-3 rounded-full bg-gold-100 dark:bg-gold-900 text-gold-600 dark:text-gold-400 hover:bg-gold-200 dark:hover:bg-gold-800 z-10"
              aria-label="Remove from favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
            <Link to={`/country/${country.cca3}`}>
              <div className="h-52 overflow-hidden border-b-4 border-gold-400">
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {country.name.common}
                </h2>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Capital:</span>{' '}
                    {country.capital?.[0] || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Region:</span>{' '}
                    {country.region}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;