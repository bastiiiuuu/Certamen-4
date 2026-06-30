import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item =>
        item.id === itemToEdit.id ? { ...item, value } : item
      ));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value, completed: false }]);
    }
  };

  const deleteItem = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const clearAll = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar TODOS los elementos?")) {
      setItems([]);
    }
  };

  // Filtrado por búsqueda
  const filteredItems = items.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Certamen CRUD</h1>

      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />

      <div className="counter">
        Total: {items.length} elemento{items.length !== 1 ? 's' : ''}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {items.length > 0 && (
          <button onClick={clearAll} className="clear-all-btn">
            Borrar todo
          </button>
        )}
      </div>

      <List 
        items={filteredItems} 
        deleteItem={deleteItem} 
        editItem={editItem}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;