function Footer() {
    return (
      <footer className="bg-gray-800 dark:bg-gray-950 py-6">
        <div className="container mx-auto text-center px-4 md:pl-4 md:pr-4 md:ml-[256px] text-gray-300">
          <p>© {new Date().getFullYear()} Country Explorer</p>
          <p className="text-sm mt-1">
            Powered by{' '}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline"
            >
              REST Countries API
            </a>
          </p>
        </div>
      </footer>
    );
  }
  
  export default Footer;