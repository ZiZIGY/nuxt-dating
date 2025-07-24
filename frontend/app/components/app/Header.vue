<script setup lang="ts">
  import { motion } from 'motion-v';

  const isAuthenticated = false;
</script>

<template>
  <motion.header
    class="w-full bg-background border-b border-border"
    :initial="{ y: -100, opacity: 0 }"
    :while-in-view="{ y: 0, opacity: 1 }"
    :in-view-options="{ once: true, amount: 0, margin: '100px' }"
    :transition="{ type: 'tween', duration: 0.5 }"
  >
    <div
      class="container mx-auto flex items-center justify-between py-4 px-4 md:px-6"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
      >
        <WidgetLogo />
        <span class="text-xl font-bold text-primary">Vue Dating</span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <WidgetLocalization />
        <WidgetTheme />
      </div>

      <div class="flex items-center space-x-4">
        <template v-if="!isAuthenticated">
          <UiButton variant="ghost">{{ $t('auth.login') }}</UiButton>
          <UiButton>{{ $t('auth.register') }}</UiButton>
        </template>
        <template v-else>
          <div class="flex items-center space-x-3">
            <span class="text-foreground">
              {{ $t('auth.greeting', { name: 'Пользователь' }) }}
            </span>
            <div
              class="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground"
            >
              П
            </div>
            <button
              class="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              {{ $t('auth.logout') }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </motion.header>
</template>
