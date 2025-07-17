<script setup lang="ts">
  import { computed } from 'vue';

  const colorMode = useColorMode();

  const isDarkMode = computed({
    get: () => colorMode.value === 'dark',
    set: (value) => {
      colorMode.preference = value ? 'dark' : 'light';
    },
  });

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };
</script>

<template>
  <div class="flex items-center gap-2">
    <UiSwitch
      :model-value="isDarkMode"
      class="relative"
      @update:model-value="toggleTheme"
    >
      <template #thumb>
        <span
          class="absolute inset-0 flex items-center justify-center text-primary"
        >
          <UiSun v-if="isDarkMode" />
          <UiMoon v-else />
        </span>
      </template>
    </UiSwitch>
    <span class="text-sm font-medium">
      {{ isDarkMode ? 'Темная' : 'Светлая' }}
    </span>
  </div>
</template>
