import React, { useState } from 'react';

// 1. Importar hooks
import { useToggle } from './hooks/useToggle';
import { useForm } from './hooks/useForm';
import { useLocalStorage } from './hooks/useLocalStorage';

// 2. Importar estilos
import './App.css'; // ¡Asegúrate de que este import exista!

function App() {
  
  // Hook 1: useToggle
  const [isDetailsVisible, toggleDetails] = useToggle(false);

  // Hook 2: useForm
  const [formValues, handleFormChange] = useForm({
    username: '',
    email: '',
  });

  // Hook 3: useLocalStorage
  const [tasks, setTasks] = useLocalStorage('myTasks', []);
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: taskInput }]);
    setTaskInput('');
  };

  // --- liminar tareas en hook 3 Hook 3
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  
  
  return (
    <div className="App-container">
      <h1>Demo de Custom Hooks</h1>

      {/* Seccion useToggle*/}
      <div className="section">
        <h2>1. Resultado de useToggle</h2>
        <button onClick={toggleDetails}>
          {isDetailsVisible ? 'Ocultar Detalles' : 'Mostrar Detalles'}
        </button>
        
        {isDetailsVisible && (
          <div style={{ marginTop: '10px' }}>
            <p>Holaaaaaaaa...</p>
          </div>
        )}
      </div>

      {/*Seccion useForm*/}
      <div className="section">
        <h2>2. Resultado de useForm</h2>
        <form>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleFormChange}
            placeholder="Nombre de usuario"
            className="form-input" 
          />
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleFormChange}
            placeholder="Email"
            className="form-input" 
          />
        </form>
        
        <h4>Resultados del formulario:</h4>
        <pre className="code-block">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>

      {/* Seccion useLocalStorage*/}
      <div className="section">
        <h2>3. Resultado de `useLocalStorage`</h2>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Nueva tarea"
            className="form-input"
          />
          <button type="submit">Agregar</button>
        </form>

        <h4>Lista de tareas</h4>
        <ul>
          {tasks.length === 0 ? (
            <p>(Sin tareas....)</p>
          ) : (
            // Añadir boton eliminar
            tasks.map(task => (
              <li key={task.id}>
                {task.text} 
                
                
                <button 
                  onClick={() => handleDeleteTask(task.id)} 
                  style={{ 
                    marginLeft: '15px', 
                    backgroundColor: '#ff6b6b', 
                    fontSize: '12px',
                    padding: '3px 8px'
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
}

export default App;