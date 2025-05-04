import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getAllCountries = async () => {
  try {
    const response = await api.get(
      '/all?fields=name,capital,flags,population,region,languages,cca3'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const searchCountriesByName = async (name) => {
  try {
    const response = await api.get(
      `/name/${name}?fields=name,capital,flags,population,region,languages,cca3`
    );
    return response.data;
  } catch (error) {
    console.error(`Error searching countries by name '${name}':`, error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await api.get(
      `/region/${region}?fields=name,capital,flags,population,region,languages,cca3`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries by region '${region}':`, error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await api.get(`/alpha/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by code '${code}':`, error);
    throw error;
  }
};