import React from 'react';
import './Toolbar.css';

function Toolbar({ searchTerm, setSearchTerm, filterGenre, setFilterGenre, handleClear, handleSort, sortOrder }) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="🔍 Пошук книжок..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
        <option value="">Усі жанри</option>
        <option value="Хоррор">Хоррор</option>
        <option value="Фентезі">Фентезі</option>
        <option value="Драма">Драма</option>
      </select>
      <button onClick={handleClear}>Очистити</button>
      <button onClick={handleSort}>
        Сортувати за ціною {sortOrder === 'asc' ? '⬆️' : sortOrder === 'desc' ? '⬇️' : ''}
      </button>
    </div>
  );
}

export default Toolbar;
