import { useState, useEffect } from 'react';

export type Language = 'vi' | 'zh';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('packsheet_language');
    return (saved as Language) || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('packsheet_language', language);
  }, [language]);

  return [language, setLanguage] as const;
}