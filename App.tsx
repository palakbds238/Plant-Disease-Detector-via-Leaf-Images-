import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DiseaseLibraryPage from './pages/DiseaseLibraryPage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';

type Page = 'home' | 'dashboard' | 'library' | 'history' | 'about';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage setPage={setCurrentPage} />;
      case 'library':
        return <DiseaseLibraryPage />;
      case 'history':
        return <HistoryPage />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen text-gray-800">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        {renderPage()}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Plant Disease Detector. Powered by AI.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;