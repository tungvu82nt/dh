import React from 'react';
import { FileText, History, Settings } from 'lucide-react';
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
  const menuItems = [
    { id: 'new_form', label: getTranslation(language, 'newForm'), icon: FileText },
    { id: 'forms_history', label: getTranslation(language, 'formsHistory'), icon: History },
    { id: 'settings', label: getTranslation(language, 'settings'), icon: Settings },
  ];

  return (
    <aside className="no-print w-64 bg-white shadow-lg p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{getTranslation(language, 'appName')}</h1>
        <p className="text-sm text-gray-600">{getTranslation(language, 'appDescription')}</p>
      </div>
      
      <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
      
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                currentView === item.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="mb-1">📱 {getTranslation(language, 'dataStoredLocally')}</p>
        <p className="font-medium">💡 {getTranslation(language, 'rememberBackup')}</p>
      </div>
    </aside>
  );
};

export default Navigation;