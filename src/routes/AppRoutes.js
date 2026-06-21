import React from 'react';
import { useAuth } from '../context/AuthContext.js';
import Home from '../pages/Home/Home.js';
import Dashboard from '../pages/Dashboard.js/Dashboard.js';
import MainLayout from '../layouts/MainLayout.js';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {!isAuthenticated ? <Home /> : <Dashboard />}
    </MainLayout>
  );
}