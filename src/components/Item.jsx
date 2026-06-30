import React from 'react';

function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    <li className={item.completed ? 'completed' : ''}>
      <span onClick={() => toggleComplete(item.id)}>
        {item.value}
      </span>
      <div>
        <button onClick={() => editItem(item)}>Editar</button>
        <button onClick={() => deleteItem(item.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Item;