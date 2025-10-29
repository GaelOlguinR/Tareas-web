import { useState } from 'react';

/**
 * Hook estado de un formulario.
  @param {object} initialState 
 */
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // Función para manejar cambios en input
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return [values, handleChange];
};