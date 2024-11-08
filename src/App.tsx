import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>Current language: {language}</p>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('pt')}>Português</button>
    </div>
  );
};

export default App;