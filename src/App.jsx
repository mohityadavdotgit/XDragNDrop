import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

export default function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== dragOverIndex) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedDigits = [...digits];
    const [movedItem] = updatedDigits.splice(draggedIndex, 1);
    updatedDigits.splice(dropIndex, 0, movedItem);

    setDigits(updatedDigits);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Drag &amp; Drop Digits</h1>
          <p style={styles.description}>
            Drag the boxes to reorder the digits 0–9.
          </p>
        </header>

        <div style={styles.grid}>
          {digits.map((digit, index) => {
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index && draggedIndex !== index;

            return (
              <div
                key={digit}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  ...styles.box,
                  ...(isDragging ? styles.draggingBox : {}),
                  ...(isDragOver ? styles.dragOverBox : {}),
                }}
              >
                {digit}
              </div>
            );
          })}
        </div>

        <footer style={styles.footer}>
          <p style={styles.tip}>
            Tip: Try reordering to make 0123456789 or reverse it!
          </p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  description: {
    fontSize: '14px',
    color: '#4b5563',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  box: {
    aspectRatio: '1 / 1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'all 0.15s ease',
  },
  draggingBox: {
    opacity: 0.4,
    border: '2px dashed #6366f1',
    backgroundColor: '#eef2ff',
  },
  dragOverBox: {
    border: '2px solid #3b82f6',
    backgroundColor: '#dbeafe',
    transform: 'scale(1.05)',
  },
  footer: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px',
  },
  tip: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
};


