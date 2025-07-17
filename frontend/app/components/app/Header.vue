<script setup lang="ts">
  const isAuthenticated = false; // Временно, потом будет из стора
  const { t } = useI18n();
</script>

<template>
  <header class="w-full py-4 px-6 bg-background border-b border-border">
    <div class="container mx-auto flex items-center justify-between">
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
      >
        <WidgetLogo />
        <span class="text-xl font-bold text-primary">Vue Dating</span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <WidgetExplodedHeartsCount />
        <WidgetLanguageSwitcher />
        <WidgetTheme />
      </div>

      <div class="flex items-center space-x-4">
        <template v-if="!isAuthenticated">
          <UiButton variant="ghost">{{ t('auth.login') }}</UiButton>
          <UiButton>{{ t('auth.register') }}</UiButton>
        </template>
        <template v-else>
          <div class="flex items-center space-x-3">
            <span class="text-foreground">{{
              t('auth.greeting', { name: 'Пользователь' })
            }}</span>
            <div
              class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground"
            >
              П
            </div>
            <button
              class="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              {{ t('auth.logout') }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>
