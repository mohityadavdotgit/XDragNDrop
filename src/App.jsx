
import React, { useState } from "react";
import "./App.css";

function App() {
  const [digits, setDigits] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // When dragging starts
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // When dragging over another box
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  // When item is dropped
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === targetIndex) {
      return;
    }

    const updatedDigits = [...digits];

    // Remove dragged item from original position
    const [draggedItem] = updatedDigits.splice(draggedIndex, 1);

    // Insert item at target position
    updatedDigits.splice(targetIndex, 0, draggedItem);

    setDigits(updatedDigits);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Reset drag states
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="app-container">
      <div className="card">

        <header>
          <h1>Drag &amp; Drop Digits</h1>
          <p>Drag the boxes to reorder the digits 0–9.</p>
        </header>

        <div className="digit-grid">
          {digits.map((digit, index) => (
            <div
              key={digit}
              className={`digit-box
                ${draggedIndex === index ? "dragging" : ""}
                ${dragOverIndex === index ? "drag-over" : ""}
              `}
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              {digit}
            </div>
          ))}
        </div>

        <footer>
          Tip: Try reordering to make 0123456789 or reverse it!
        </footer>

      </div>
    </div>
  );
}

export default App;
