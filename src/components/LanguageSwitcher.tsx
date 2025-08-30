import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../utils/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-3 lg:mb-4">
      <Globe size={16} className="text-gray-500 flex-shrink-0" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="text-sm border border-gray-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] lg:min-h-[auto]"
      >
        <option value="vi">Tiếng Việt</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;