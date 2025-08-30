import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import NewForm from './components/NewForm';
import FormsHistory from './components/FormsHistory';

import SettingsBackup from './components/SettingsBackup';
import WelcomeModal from './components/WelcomeModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLanguage } from './hooks/useLanguage';
import { ShippingForm, ViewType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('new_form');
  const [showWelcome, setShowWelcome] = useState(false);
  const [language, setLanguage] = useLanguage();
  

  const [forms, setForms] = useLocalStorage<ShippingForm[]>('packsheet_forms', []);

  // Show welcome modal for first-time users
  useEffect(() => {
    const hasVisited = localStorage.getItem('packsheet_has_visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('packsheet_has_visited', 'true');
    }
  }, []);

  const handleFormSave = (form: ShippingForm) => {
    setForms([form, ...forms]);
  };

  const handleDataImport = (data: { forms: ShippingForm[] }) => {
    setForms(data.forms);
    setCurrentView('new_form');
  };

  const handleDataClear = () => {
    localStorage.removeItem('packsheet_forms');
    setForms([]);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'new_form':
        return (
          <NewForm
            onFormSave={handleFormSave}
            language={language}
          />
        );
      case 'forms_history':
        return (
          <FormsHistory
            forms={forms}
            onFormsChange={setForms}
            language={language}
          />
        );

      case 'settings':
        return (
          <SettingsBackup
            forms={forms}
            onDataImport={handleDataImport}
            onDataClear={handleDataClear}
            language={language}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {renderCurrentView()}
      </main>

      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)}
        language={language}
      />

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;