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
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 ml-0 md:ml-64 overflow-y-auto">
              <main className="flex-1 p-4 md:p-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/country/:code" element={<CountryDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;