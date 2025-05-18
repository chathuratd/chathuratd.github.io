import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Favorites from '@/pages/Favorites';
import { ThemeProvider } from '@/context/ThemeContext';
import { vi } from 'vitest';
import * as useFavoritesModule from '@/hooks/useFavorites';

vi.mock('@/hooks/useFavorites');

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  capital: ['Washington, D.C.'],
  region: 'Americas',
  flags: { svg: 'https://flagcdn.com/w320/us.svg' },
};

describe('Favorites', () => {
  beforeEach(() => {
    vi.mocked(useFavoritesModule.useFavorites).mockReturnValue({
      favorites: [mockCountry],
      removeFavorite: vi.fn(),
      addFavorite: vi.fn(),
      isFavorite: vi.fn().mockReturnValue(true),
    });
    vi.useFakeTimers();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('renders favorite countries', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
  });

  test('removes favorite on button click', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </ThemeProvider>
    );

    const removeButton = screen.getByRole('button', { name: 'Remove from favorites' });
    fireEvent.click(removeButton);

    expect(vi.mocked(useFavoritesModule.useFavorites)().removeFavorite).toHaveBeenCalledWith('USA');
  });

  test('shows empty state when no favorites', () => {
    vi.mocked(useFavoritesModule.useFavorites).mockReturnValue({
      favorites: [],
      removeFavorite: vi.fn(),
      addFavorite: vi.fn(),
      isFavorite: vi.fn().mockReturnValue(false),
    });

    render(
      <ThemeProvider>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('No favorite countries added yet. Start exploring!')).toBeInTheDocument();
  });
});