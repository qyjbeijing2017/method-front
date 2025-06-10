import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en_US } from './en_US/en_US';
import { zh_CN } from './zh_CN/zh_CN';

i18n.use(initReactI18next).init({
  resources: {
    en_US,
    zh_CN,
  },
  lng: 'en_US', // 默认语言
  fallbackLng: 'en_US',
  ns: [
    'translation', // 默认命名空间
    'error_report', 
    'navigation', 
    'sign_in',
    'methods',
    'tasks',
    'settings',
    'file_editor',
  ], // 命名空间
  defaultNS: 'translation', // 默认命名空间
  interpolation: {
    escapeValue: false, // react 已经安全处理 XSS
  },
});

export default i18n;