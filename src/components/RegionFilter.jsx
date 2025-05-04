function RegionFilter({ selectedRegion, onRegionChange }) {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    return (
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="select"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region === 'All' ? 'Filter by Region' : region}
          </option>
        ))}
      </select>
    );
  }
  
  export default RegionFilter;