function CountryCardSkeleton() {
    return (
      <div className="card animate-pulse">
        <div className="h-52 w-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }
  
  export default CountryCardSkeleton;