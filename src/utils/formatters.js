export const formatPopulation = (population) => {
    return population ? population.toLocaleString() : 'N/A';
  };
  
  export const extractNativeName = (nativeName) => {
    if (!nativeName || Object.keys(nativeName).length === 0) {
      return 'N/A';
    }
  
    const firstKey = Object.keys(nativeName)[0];
    return nativeName[firstKey].common || 'N/A';
  };