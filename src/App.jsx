import React, { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handlePackageSelect = (packageData, scenario) => {
    setSelectedPackage({ ...packageData, selectedScenario: scenario });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'calendar':
        return <CalendarPage onNavigate={handleNavigate} />;
      case 'packages':
        return <PackagesPage onNavigate={handleNavigate} onPackageSelect={handlePackageSelect} />;
      case 'brands':
        return <PlaceholderPage pageName="Marcas" onNavigate={handleNavigate} />;
      case 'quiz':
        return <PlaceholderPage pageName="Quiz" onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;
