import { useState, useEffect } from 'react';

export function useSessionStorage(key, initialValue) {
  const TIMEOUT_MINUTES = 1;
  const TIMEOUT_MS = TIMEOUT_MINUTES * 60 * 1000;

  const getStoredValue = () => {
    try {
      const item = window.sessionStorage.getItem(key);
      const timestamp = window.sessionStorage.getItem(`${key}_timestamp`);
      const now = Date.now();

      if (item && timestamp) {
        const lastAccess = parseInt(timestamp, 10);
        if (now - lastAccess <= TIMEOUT_MS) {
          window.sessionStorage.setItem(`${key}_timestamp`, now.toString());
          return JSON.parse(item);
        } else {
          window.sessionStorage.removeItem(key);
          window.sessionStorage.removeItem(`${key}_timestamp`);
          return initialValue;
        }
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      window.sessionStorage.setItem(`${key}_timestamp`, Date.now().toString());
    } catch (error) {
      console.error(`Error saving to sessionStorage key "${key}":`, error);
    }
  }, [key, value]);

  useEffect(() => {
    const checkExpiration = () => {
      const timestamp = window.sessionStorage.getItem(`${key}_timestamp`);
      if (timestamp) {
        const now = Date.now();
        const lastAccess = parseInt(timestamp, 10);
        if (now - lastAccess > TIMEOUT_MS) {
          window.sessionStorage.removeItem(key);
          window.sessionStorage.removeItem(`${key}_timestamp`);
          setValue(initialValue);
        }
      }
    };

    const interval = setInterval(checkExpiration, 10000);

    return () => clearInterval(interval);
  }, [key, initialValue]);

  return [value, setValue];
}