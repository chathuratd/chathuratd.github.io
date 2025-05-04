import CountryCard from './CountryCard';
import CountryCardSkeleton from './CountryCardSkeleton';
import ErrorMessage from './ErrorMessage';

function CountryList({ countries, loading, error }) {
  const skeletonCount = 12;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
      {loading
        ? Array(skeletonCount)
            .fill()
            .map((_, index) => (
              <CountryCardSkeleton key={index} className="mb-6 break-inside-avoid" />
            ))
        : countries.length > 0
        ? countries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              className="mb-6 break-inside-avoid"
            />
          ))
        : !loading && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No countries found. Try adjusting your search or filter.
              </p>
            </div>
          )}
    </div>
  );
}

export default CountryList;