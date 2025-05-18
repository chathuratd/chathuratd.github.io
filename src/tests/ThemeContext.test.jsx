import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { vi } from 'vitest';

const TestComponent = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div>
      <span>{darkMode ? 'Dark' : 'Light'}</span>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.useFakeTimers();
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('initializes dark mode based on system preference', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
      matches: true,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(window.sessionStorage.getItem('darkMode')).toBe('true');
  });

  test('toggles dark mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Light')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle'));

    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(window.sessionStorage.getItem('darkMode')).toBe('true');
  });
});