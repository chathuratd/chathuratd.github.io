import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../src/components/CountryCard';
import { ThemeProvider } from '../src/context/ThemeContext';

const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  capital: ['Washington, D.C.'],
  region: 'Americas',
  population: 331002651,
  languages: { eng: 'English' },
  flags: { png: 'https://flagcdn.com/w320/us.png' },
};

test('renders country card with correct details', () => {
  render(
    <ThemeProvider>
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    </ThemeProvider>
  );

  expect(screen.getByText('United States')).toBeInTheDocument();
  expect(screen.getByText('Capital: Washington, D.C.')).toBeInTheDocument();
  expect(screen.getByText('Region: Americas')).toBeInTheDocument();
  expect(screen.getByText('Population: 331,002,651')).toBeInTheDocument();
  expect(screen.getByText('Languages: English')).toBeInTheDocument();
  expect(screen.getByAltText('Flag of United States')).toBeInTheDocument();
});