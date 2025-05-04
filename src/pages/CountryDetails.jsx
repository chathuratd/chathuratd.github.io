import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import { formatPopulation } from '../utils/formatters';
import ErrorMessage from '../components/ErrorMessage';

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getCountryByCode(code);
        if (data && data.length > 0) {
          setCountry(data[0]);

          if (data[0].borders && data[0].borders.length > 0) {
            const borderPromises = data[0].borders.map((border) =>
              getCountryByCode(border)
            );
            const borderData = await Promise.all(borderPromises);
            const simplifiedBorders = borderData.map((country) => ({
              name: country[0].name.common,
              code: country[0].cca3,
            }));
            setBorderCountries(simplifiedBorders);
          }
        }
      } catch (err) {
        setError('Failed to load country details. Please try again later.');
        console.error('Error fetching country details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row gap-12 animate-pulse">
          <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-700 aspect-[4/3] rounded-2xl"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2">
              {Array(8)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-5 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mb-8 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto py-12">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mb-8 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <ErrorMessage message="Country not found" />
      </div>
    );
  }

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol})`)
        .join(', ')
    : 'N/A';

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div className="container mx-auto py-12">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-8 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      <div className="card flex flex-col md:flex-row gap-12 animate-bounce-in">
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl border-4 border-gold-400">
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {country.name.common}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <p>
              <span className="font-semibold">Native Name:</span>{' '}
              {country.name.nativeName
                ? Object.values(country.name.nativeName)[0].common
                : country.name.common}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{' '}
              {formatPopulation(country.population)}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Sub Region:</span>{' '}
              {country.subregion || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {country.capital?.[0] || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Top Level Domain:</span>{' '}
              {country.tld?.join(', ') || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Currencies:</span> {currencies}
            </p>
            <p>
              <span className="font-semibold">Languages:</span> {languages}
            </p>
          </div>

          {borderCountries.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Border Countries:
              </h2>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((border) => (
                  <Link
                    key={border.code}
                    to={`/country/${border.code}`}
                    className="btn btn-secondary text-sm py-2"
                  >
                    {border.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;