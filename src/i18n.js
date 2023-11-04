import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationID from './locales/id/translation.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'id',
    fallbackLng: 'id', // Bahasa default jika bahasa yang dipilih tidak tersedia
    resources: {
      en: {
        translation: translationEN, // Terjemahan bahasa Inggris
      },
      id: {
        translation: translationID, // Terjemahan bahasa Indonesia
      },
    },
  });

export default i18n;
