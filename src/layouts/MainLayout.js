import React from 'react';
import Header from '../components/Header/Header.js';
import Footer from '../components/Footer/Footer.js';

export default function MainLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-shrink-0 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}