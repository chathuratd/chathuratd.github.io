import { useState, useEffect, useCallback } from 'react';
import SearchFilter from '../components/SearchFilter';
import CountryList from '../components/CountryList';
import {
  getAllCountries,
  searchCountriesByName,
  getCountriesByRegion,
} from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = useCallback(
    async (term) => {
      setSearchTerm(term);

      if (!term.trim()) {
        if (selectedRegion === 'All') {
          setFilteredCountries(countries);
        } else {
          try {
            const regionData = await getCountriesByRegion(selectedRegion);
            setFilteredCountries(regionData);
          } catch (err) {
            console.error('Error filtering by region:', err);
          }
        }
        return;
      }

      try {
        setLoading(true);
        const searchData = await searchCountriesByName(term);

        if (selectedRegion !== 'All') {
          setFilteredCountries(
            searchData.filter((country) => country.region === selectedRegion)
          );
        } else {
          setFilteredCountries(searchData);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setFilteredCountries([]);
        } else {
          setError('Error searching countries. Please try again.');
          console.error('Error searching countries:', err);
        }
      } finally {
        setLoading(false);
      }
    },
    [countries, selectedRegion]
  );

  const handleRegionChange = useCallback(
    async (region) => {
      setSelectedRegion(region);

      try {
        setLoading(true);

        if (region === 'All') {
          if (searchTerm) {
            const searchData = await searchCountriesByName(searchTerm);
            setFilteredCountries(searchData);
          } else {
            setFilteredCountries(countries);
          }
        } else {
          const regionData = await getCountriesByRegion(region);

          if (searchTerm) {
            const searchInRegion = regionData.filter((country) =>
              country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCountries(searchInRegion);
          } else {
            setFilteredCountries(regionData);
          }
        }
      } catch (err) {
        setError('Error filtering countries. Please try again.');
        console.error('Error filtering countries:', err);
      } finally {
        setLoading(false);
      }
    },
    [countries, searchTerm]
  );

  return (
    <div className="container mx-auto">
      <SearchFilter
        search={searchTerm}
        setSearch={handleSearch}
        region={selectedRegion}
        setRegion={handleRegionChange}
      />
      <CountryList
        countries={filteredCountries}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Home;