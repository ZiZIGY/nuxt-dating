// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import MotionResolver from 'motion-v/resolver';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/sound/nuxt',
    '@nuxtjs/i18n',
  ],

  // Настройка для Docker
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Настройка API для подключения к бэкенду
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:5000',
    },
  },

  shadcn: {
    prefix: 'ui',
    componentDir: './app/components/ui',
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
  },

  sound: {
    sounds: {
      scan: true,
    },
  },

  icon: {
    serverBundle: {
      collections: ['noto-v1'],
    },
  },

  i18n: {
    defaultLocale: 'ru',
    locales: [
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
      Components({
        resolvers: [MotionResolver()],
      }),
    ],
  },
});
