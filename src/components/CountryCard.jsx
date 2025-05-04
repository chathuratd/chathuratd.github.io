import { Link } from 'react-router-dom';
import { formatPopulation } from '../utils/formatters';
import FavoriteButton from './FavoriteButton';
import { useState } from 'react';

function CountryCard({ country }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/country/${country.cca3}`} className="block">
        <div className="h-52 overflow-hidden border-b-4 border-gold-400">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 truncate">
            {country.name.common}
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {country.capital?.[0] || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{' '}
              {formatPopulation(country.population)}
            </p>
            <p>
              <span className="font-semibold">Languages:</span>{' '}
              {country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A'}
            </p>
          </div>
        </div>
      </Link>
      <div
        className={`transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <FavoriteButton country={country} />
      </div>
    </div>
  );
}

export default CountryCard;