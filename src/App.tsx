import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import NewForm from './components/NewForm';
import FormsHistory from './components/FormsHistory';

import SettingsBackup from './components/SettingsBackup';
import WelcomeModal from './components/WelcomeModal';
import { useSupabaseShippingForms, useSupabaseUserSettings } from './hooks/useSupabase';
import { useLanguage } from './hooks/useLanguage';
import { ShippingForm, ViewType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('new_form');
  const [showWelcome, setShowWelcome] = useState(false);
  const [language, setLanguage] = useLanguage();

  // Use Supabase instead of localStorage
  const {
    forms,
    loading: formsLoading,
    error: formsError,
    addForm,
    deleteForm,
    clearAllForms,
    importForms
  } = useSupabaseShippingForms();

  const { settings, updateSettings } = useSupabaseUserSettings();

  // Show welcome modal for first-time users
  useEffect(() => {
    const hasVisited = localStorage.getItem('packsheet_has_visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('packsheet_has_visited', 'true');
    }
  }, []);

  const handleFormSave = async (form: ShippingForm) => {
    try {
      await addForm(form);
    } catch (error) {
      console.error('Failed to save form:', error);
      alert('Lỗi khi lưu đơn hàng. Vui lòng thử lại.');
    }
  };

  const handleDataImport = async (data: { forms: ShippingForm[] }) => {
    try {
      await importForms(data.forms);
      setCurrentView('new_form');
    } catch (error) {
      console.error('Failed to import forms:', error);
      alert('Lỗi khi nhập dữ liệu. Vui lòng thử lại.');
    }
  };

  const handleDataClear = async () => {
    try {
      await clearAllForms();
    } catch (error) {
      console.error('Failed to clear forms:', error);
      alert('Lỗi khi xóa dữ liệu. Vui lòng thử lại.');
    }
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
            onFormDelete={deleteForm}
            language={language}
            loading={formsLoading}
            error={formsError}
          />
        );

      case 'settings':
        return (
          <SettingsBackup
            forms={forms}
            onDataImport={handleDataImport}
            onDataClear={handleDataClear}
            language={language}
            loading={formsLoading}
            error={formsError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Mobile: Full screen layout */}
      <div className="lg:hidden">
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          language={language}
          onLanguageChange={setLanguage}
        />

        <main className="pt-16 px-4 pb-8 overflow-y-auto min-h-screen">
          <div className="max-w-full mx-auto">
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Desktop: Sidebar layout */}
      <div className="hidden lg:flex lg:h-screen">
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          language={language}
          onLanguageChange={setLanguage}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderCurrentView()}
          </div>
        </main>
      </div>

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

        /* Mobile optimizations */
        @media (max-width: 1024px) {
          .mobile-optimized {
            font-size: 14px;
          }
        }

        /* Touch targets for mobile */
        @media (max-width: 768px) {
          button, input, select, textarea {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;