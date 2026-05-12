import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Defina a variável de ambiente para o endpoint do backend
const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const protocol = window.location.protocol;
const backendUrl = codespaceName
  ? `${protocol}//${codespaceName}-8000.app.github.dev`
  : '';
process.env.REACT_APP_CODESPACE_URL = backendUrl;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
