import React from 'react';
import { X, Zap, Shield, FileText } from 'lucide-react';
import { Language, getTranslation } from '../utils/translations';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 lg:p-6 relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-4 lg:mb-6">
          <div className="bg-blue-100 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
            <Zap className="text-blue-600" size={24} />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{getTranslation(language, 'welcomeTitle')}</h2>
          <p className="text-sm lg:text-base text-gray-600 px-2">{getTranslation(language, 'welcomeSubtitle')}</p>
        </div>

        <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="text-green-500 flex-shrink-0 mt-0.5 lg:mt-1" size={16} />
            <div>
              <p className="font-medium text-gray-800 text-sm lg:text-base">{getTranslation(language, 'dataSafe')}</p>
              <p className="text-xs lg:text-sm text-gray-600">{getTranslation(language, 'dataSafeDesc')}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileText className="text-blue-500 flex-shrink-0 mt-0.5 lg:mt-1" size={16} />
            <div>
              <p className="font-medium text-gray-800 text-sm lg:text-base">{getTranslation(language, 'noRegistration')}</p>
              <p className="text-xs lg:text-sm text-gray-600">{getTranslation(language, 'noRegistrationDesc')}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-3 lg:p-4 rounded-lg mb-4 lg:mb-6">
          <p className="text-xs lg:text-sm text-yellow-800">
            <strong>💡 {getTranslation(language, 'tipStart')}</strong>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-3 lg:py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium text-base"
        >
          {getTranslation(language, 'startUsing')}
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;