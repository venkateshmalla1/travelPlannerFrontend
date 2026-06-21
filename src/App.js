import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext.js';
import { TravelProvider } from './context/TravelContext.js';
import AppRoutes from './routes/AppRoutes.js';

function App() {
  return (
    <div className="app-shell">
      <AuthProvider>
        <TravelProvider>
          <AppRoutes />
        </TravelProvider>
      </AuthProvider>
    </div>
  );
}

export default App;