import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      location: 'Location',
      menu: 'Menu',
      onlineOrder: 'Online Order',
      contact: 'Contact',
      logIn: 'Log In',
      heroImage1: 'Hero Image 1',
      heroImage2: 'Hero Image 2',
      findUs: 'Find Us',
    },
  },
  pt: {
    translation: {
      location: 'Localização',
      menu: 'Menu',
      onlineOrder: 'Encomenda Online',
      contact: 'Contato',
      logIn: 'Entrar',
      heroImage1: 'Imagem Heroica 1',
      heroImage2: 'Imagem Heroica 2',
      findUs: 'Encontre-nos',
    },
  },
};

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Passes i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default to English if translation is missing
    interpolation: {
      escapeValue: false, // React handles escaping
    },
  });

export default i18n;