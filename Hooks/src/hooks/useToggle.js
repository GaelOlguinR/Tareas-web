import { useState, useCallback } from 'react';

/**
 * Hook estado booleano.
  @param {boolean} initialState - valor booleano fals.
 */
export const useToggle = (initialState = false) => {
  // Guarda el estado booleano
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []); 

  return [state, toggle];
};