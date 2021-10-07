import i18n from 'i18next'
import resources from './locales'

export const langs = [
  'en', // default language
  'ru',
  'zh',
  'ja',

  // TODO: make translations
  // 'ko',
]

i18n.init({
  resources,
  lng: localStorage.getItem('armor-website-language') || langs[0],
  fallbackLng: langs[0],
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
