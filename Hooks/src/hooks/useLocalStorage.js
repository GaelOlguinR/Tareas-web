import { useState, useEffect } from 'react';

// Función helper para obtener el valor inicial fuera del hook
function getStorageValue(key, defaultValue) {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.warn(`Error al leer la llave “${key}” de localStorage:`, error);
    return defaultValue;
  }
}

/**
 * @param {string} key - llave para guardar en localStorage.
 * @param {*} initialValue - valor inicial si no hay nada en localStorage.
 */
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, initialValue);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error al guardar la llave “${key}” en localStorage:`, error);
    }
  }, [key, value]); 
  
  return [value, setValue];
};