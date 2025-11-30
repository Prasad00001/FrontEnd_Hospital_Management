import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // This is where Tailwind directives should be
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import { ToastContainer } from 'react-toastify'; // Uncomment if you installed react-toastify
// import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* <ToastContainer /> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);