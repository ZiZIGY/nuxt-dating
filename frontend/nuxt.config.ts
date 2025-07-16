// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],

  // Настройка для Docker
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Настройка API для подключения к бэкенду
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URL || 'http://localhost:5000',
    },
  },
});
