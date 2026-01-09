import { defineRouting } from 'next-intl/routing';
export const supportedLanguages = ['en', 'fr', 'es', 'ar']
export const routing = defineRouting({
  locales: supportedLanguages,
  defaultLocale: 'en'
});