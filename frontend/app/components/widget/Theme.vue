<script setup lang="ts">
  const colorMode = useColorMode();

  const isDarkMode = computed({
    get: () => colorMode.value === 'dark',
    set: (value) => {
      colorMode.preference = value ? 'dark' : 'light';
    },
  });
</script>

<template>
  <ClientOnly>
    <UiSwitch
      v-model="isDarkMode"
      class="relative"
    >
      <template #thumb>
        <span
          class="absolute inset-0 flex items-center justify-center text-primary"
        >
          <UiMoon v-if="isDarkMode" />
          <UiSun v-else />
        </span>
      </template>
    </UiSwitch>
  </ClientOnly>
</template>
