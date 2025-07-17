<script setup lang="ts">
  import { computed } from 'vue';

  const { count } = useExplodedHeartsCount();

  // Вычисляем размер иконки в зависимости от количества взорванных сердец
  const iconSize = computed(() => {
    if (count.value < 10) return 'text-lg';
    if (count.value < 50) return 'text-xl';
    if (count.value < 100) return 'text-2xl';
    return 'text-3xl';
  });

  // Вычисляем цвет в зависимости от количества взорванных сердец
  const heartColor = computed(() => {
    if (count.value < 10) return 'text-primary';
    if (count.value < 50) return 'text-secondary';
    if (count.value < 100) return 'text-accent';
    return 'text-destructive';
  });
</script>

<template>
  <div
    class="flex items-center gap-2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 shadow-md"
  >
    <div>
      <Icon
        name="noto-v1:revolving-hearts"
        :class="[heartColor, iconSize, 'transition-all duration-300']"
      />
    </div>

    <div class="ml-2 font-bold">
      {{ count }}
    </div>
  </div>
</template>
