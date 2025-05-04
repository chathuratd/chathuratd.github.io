function ErrorMessage({ message }) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-8 bg-red-50/90 dark:bg-red-900/90 backdrop-blur-md text-red-600 dark:text-red-300 rounded-2xl mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
          Oops, Something Went Wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {message || 'Please try again later.'}
        </p>
      </div>
    );
  }
  
  export default ErrorMessage;