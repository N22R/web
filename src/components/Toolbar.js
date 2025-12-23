import React from 'react';
import './Toolbar.css';

function Toolbar() {
  return (
    <div className="toolbar">
      <input type="text" placeholder="🔍 Пошук книжок..." />
      <button> Пошук</button>
      <button> Очистити</button>
      <button> Сортувати за ціною</button>
    </div>
  );
}

export default Toolbar;
