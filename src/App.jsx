import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <Form 
        addOrUpdateItem={addOrUpdateItem} 
        itemToEdit={itemToEdit} 
      />
      <List 
        items={items} 
        deleteItem={deleteItem} 
        editItem={editItem} 
      />

      {/* Guía visual de operaciones CRUD */}
      <div className="crud-guide">
        <h3>Inicia la aplicación y prueba las operaciones CRUD:</h3>
        
        <div className="crud-card crear">
          <strong>Crear:</strong> agrega nuevos elementos utilizando el formulario.
        </div>
        <div className="crud-card leer">
          <strong>Leer:</strong> visualiza los elementos en la lista.
        </div>
        <div className="crud-card actualizar">
          <strong>Actualizar:</strong> edita un elemento seleccionándolo y actualízalo en el formulario.
        </div>
        <div className="crud-card eliminar">
          <strong>Eliminar:</strong> elimina elementos de la lista.
        </div>
      </div>
    </div>
  );
}

export default App;