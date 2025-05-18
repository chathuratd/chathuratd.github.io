import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '@/components/CountryCard';
import { ThemeProvider } from '@/context/ThemeContext';
import { vi } from 'vitest';
import * as useFavoritesModule from '@/hooks/useFavorites';

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  capital: ['Washington, D.C.'],
  region: 'Americas',
  population: 331002651,
  languages: { eng: 'English' },
  flags: { png: 'https://flagcdn.com/w320/us.png' },
};

const mockCountryIncomplete = {
  cca3: 'XYZ',
  name: { common: 'Unknown Country' },
  capital: [],
  region: '',
  population: 0,
  languages: {},
  flags: { png: '' },
};

describe('CountryCard', () => {
  const mockFavorites = {
    isFavorite: vi.fn(),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  };

  beforeEach(() => {
    vi.spyOn(useFavoritesModule, 'useFavorites').mockReturnValue(mockFavorites);
    mockFavorites.isFavorite.mockReturnValue(false);
    vi.useFakeTimers();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('renders country card with complete details', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CountryCard country={mockCountry} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('331,002,651')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByAltText('Flag of United States')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/country/USA');
  });

  test('renders country card with incomplete details', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CountryCard country={mockCountryIncomplete} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Unknown Country')).toBeInTheDocument();
    const capitalParagraph = screen.getByText('Capital:').parentElement;
    expect(capitalParagraph).toHaveTextContent('Capital: N/A');
    expect(screen.getByAltText('Flag of Unknown Country')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/country/XYZ');
  });

  test('applies scale transform on hover', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CountryCard country={mockCountry} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const card = screen.getByRole('link').closest('div');
    expect(card).toHaveStyle('transform: scale(1)');

    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle('transform: scale(1.01)');

    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle('transform: scale(1)');
  });

  test('shows favorite button on hover', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CountryCard country={mockCountry} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const favoriteButtonContainer = screen.getByRole('button').parentElement;
    expect(favoriteButtonContainer).toHaveClass('opacity-0');

    fireEvent.mouseEnter(screen.getByRole('link').closest('div'));
    expect(favoriteButtonContainer).toHaveClass('opacity-100');

    fireEvent.mouseLeave(screen.getByRole('link').closest('div'));
    expect(favoriteButtonContainer).toHaveClass('opacity-0');
  });

  test('toggles favorite status on button click', () => {
    mockFavorites.isFavorite.mockReturnValue(false);

    render(
      <ThemeProvider>
        <MemoryRouter>
          <CountryCard country={mockCountry} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const favoriteButton = screen.getByRole('button', { name: 'Add to favorites' });
    fireEvent.click(favoriteButton);

    expect(mockFavorites.addFavorite).toHaveBeenCalledWith(mockCountry);
    expect(mockFavorites.removeFavorite).not.toHaveBeenCalled();

    mockFavorites.isFavorite.mockReturnValue(true);

    cleanup();

    render(
      <ThemeProvider>
        <MemoryRouter>
          <CountryCard country={mockCountry} />
        </MemoryRouter>
      </ThemeProvider>
    );

    const updatedButton = screen.getByRole('button', { name: 'Remove from favorites' });
    fireEvent.click(updatedButton);

    expect(mockFavorites.removeFavorite).toHaveBeenCalledWith('USA');
  });
});