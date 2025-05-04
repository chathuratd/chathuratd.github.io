import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (country) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.cca3 === country.cca3)) return prev;
      return [
        ...prev,
        {
          cca3: country.cca3,
          name: { common: country.name.common },
          flags: { svg: country.flags.svg || country.flags.png || '' },
          capital: country.capital || [],
          region: country.region || 'N/A',
        },
      ];
    });
  };

  const removeFavorite = (countryCode) => {
    setFavorites((prev) =>
      prev.filter((country) => country.cca3 !== countryCode)
    );
  };

  const isFavorite = (countryCode) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}