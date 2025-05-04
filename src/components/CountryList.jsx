import CountryCard from './CountryCard';
import CountryCardSkeleton from './CountryCardSkeleton';
import ErrorMessage from './ErrorMessage';

function CountryList({ countries, loading, error }) {
  const skeletonCount = 12;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? Array(skeletonCount)
            .fill()
            .map((_, index) => (
              <CountryCardSkeleton key={index} className="w-full" />
            ))
        : countries.length > 0
        ? countries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              className="w-full"
            />
          ))
        : !loading && (
            <div className="col-span-full text-center py-16">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No countries found. Try adjusting your search or filter.
              </p>
            </div>
          )}
    </div>
  );
}

export default CountryList;