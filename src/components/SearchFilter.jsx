import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';

function SearchFilter({ search, setSearch, region, setRegion }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
      <div className="w-full md:w-1/2">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="w-full md:w-1/4">
        <RegionFilter selectedRegion={region} onRegionChange={setRegion} />
      </div>
    </div>
  );
}

export default SearchFilter;