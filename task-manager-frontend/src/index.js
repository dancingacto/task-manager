import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Initial render: Render the app into the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

