import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import navZh from '../locales/zh/nav.json';
import commonZh from '../locales/zh/common.json';
import homeZh from '../locales/zh/home.json';
import productsZh from '../locales/zh/products.json';
import devZh from '../locales/zh/dev.json';
import aboutZh from '../locales/zh/about.json';
import marketZh from '../locales/zh/market.json';
import tasksZh from '../locales/zh/tasks.json';
import dashZh from '../locales/zh/dash.json';
import footerZh from '../locales/zh/footer.json';

import navEn from '../locales/en/nav.json';
import commonEn from '../locales/en/common.json';
import homeEn from '../locales/en/home.json';
import productsEn from '../locales/en/products.json';
import devEn from '../locales/en/dev.json';
import aboutEn from '../locales/en/about.json';
import marketEn from '../locales/en/market.json';
import tasksEn from '../locales/en/tasks.json';
import dashEn from '../locales/en/dash.json';
import footerEn from '../locales/en/footer.json';

const resources = {
  zh: {
    translation: {
      nav: navZh, common: commonZh, home: homeZh, products: productsZh,
      dev: devZh, about: aboutZh, market: marketZh, tasks: tasksZh,
      dash: dashZh, footer: footerZh,
    },
  },
  en: {
    translation: {
      nav: navEn, common: commonEn, home: homeEn, products: productsEn,
      dev: devEn, about: aboutEn, market: marketEn, tasks: tasksEn,
      dash: dashEn, footer: footerEn,
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
