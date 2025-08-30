import React, { useState } from 'react';
import { FileText, History, Settings, Menu, X } from 'lucide-react';
import { ViewType } from '../types';
import { Language, getTranslation } from '../utils/translations';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, language, onLanguageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'new_form', label: getTranslation(language, 'newForm'), icon: FileText },
    { id: 'forms_history', label: getTranslation(language, 'formsHistory'), icon: History },
    { id: 'settings', label: getTranslation(language, 'settings'), icon: Settings },
  ];

  const handleMenuClick = (viewId: ViewType) => {
    onViewChange(viewId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden no-print fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Navigation Sidebar */}
      <aside className={`
        no-print bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out
        fixed lg:relative top-0 left-0 h-full z-50
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-64
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="p-6 pt-16 lg:pt-6">
          <div className="mb-8">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
              {getTranslation(language, 'appName')}
            </h1>
            <p className="text-sm text-gray-600 hidden sm:block">
              {getTranslation(language, 'appDescription')}
            </p>
          </div>

          <div className="mb-6">
            <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
          </div>

          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id as ViewType)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    currentView === item.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm lg:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="mb-1">📱 {getTranslation(language, 'dataStoredLocally')}</p>
            <p className="font-medium">💡 {getTranslation(language, 'rememberBackup')}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;