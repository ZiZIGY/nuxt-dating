<script setup lang="ts">
  const isAuthenticated = false; // Временно, потом будет из стора
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

      <WidgetExplodedHeartsCount />

      <div class="flex items-center space-x-4">
        <template v-if="!isAuthenticated">
          <UiButton variant="ghost">Войти</UiButton>
          <UiButton>Регистрация</UiButton>
        </template>
        <template v-else>
          <div class="flex items-center space-x-3">
            <span class="text-foreground">Привет, Пользователь</span>
            <div
              class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground"
            >
              П
            </div>
            <button
              class="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Выйти
            </button>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>
