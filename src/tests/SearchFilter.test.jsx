import { render, screen, cleanup } from '@testing-library/react';
import SearchFilter from '@/components/SearchFilter';
import { ThemeProvider } from '@/context/ThemeContext';
import { vi } from 'vitest';

describe('SearchFilter', () => {
  const setSearch = vi.fn();
  const setRegion = vi.fn();

  const defaultProps = {
    search: '',
    setSearch,
    region: 'All',
    setRegion,
  };

  beforeEach(() => {
    setSearch.mockClear();
    setRegion.mockClear();
    vi.useFakeTimers();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('renders search bar and region filter', () => {
    render(
      <ThemeProvider>
        <SearchFilter {...defaultProps} />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    const regionSelect = screen.getByRole('combobox');

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(regionSelect).toBeInTheDocument();
    expect(regionSelect).toHaveValue('All');
  });

  test('renders all region options', () => {
    render(
      <ThemeProvider>
        <SearchFilter {...defaultProps} />
      </ThemeProvider>
    );

    const regionSelect = screen.getByRole('combobox');
    const options = regionSelect.querySelectorAll('option');

    expect(options).toHaveLength(6);
    expect(options[0]).toHaveTextContent('Filter by Region');
    expect(options[1]).toHaveTextContent('Africa');
    expect(options[2]).toHaveTextContent('Americas');
    expect(options[3]).toHaveTextContent('Asia');
    expect(options[4]).toHaveTextContent('Europe');
    expect(options[5]).toHaveTextContent('Oceania');
  });

  test('applies dark mode classes when darkMode is true', () => {
    window.sessionStorage.setItem('darkMode', JSON.stringify(true));
    window.sessionStorage.setItem('darkMode_timestamp', Date.now().toString());

    render(
      <ThemeProvider>
        <SearchFilter {...defaultProps} />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    const regionSelect = screen.getByRole('combobox');

    expect(searchInput).toHaveClass('dark:bg-gray-800');
    expect(searchInput).toHaveClass('dark:text-gray-100');
    expect(regionSelect).toHaveClass('dark:bg-gray-800');
    expect(regionSelect).toHaveClass('dark:text-gray-100');
  });
});