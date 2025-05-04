import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilter from '../src/components/SearchFilter';
import { ThemeProvider } from '../src/context/ThemeContext';

test('renders search bar and region filter', () => {
  const setSearch = jest.fn();
  const setRegion = jest.fn();

  render(
    <ThemeProvider>
      <SearchFilter
        search=""
        setSearch={setSearch}
        region="All"
        setRegion={setRegion}
      />
    </ThemeProvider>
  );

  const searchInput = screen.getByPlaceholderText('Search countries...');
  const regionSelect = screen.getByRole('combobox');

  expect(searchInput).toBeInTheDocument();
  expect(regionSelect).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'Canada' } });
  expect(setSearch).toHaveBeenCalledWith('Canada');

  fireEvent.change(regionSelect, { target: { value: 'Americas' } });
  expect(setRegion).toHaveBeenCalledWith('Americas');
});