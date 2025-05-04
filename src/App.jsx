import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4 md:p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/country/:code" element={<CountryDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;