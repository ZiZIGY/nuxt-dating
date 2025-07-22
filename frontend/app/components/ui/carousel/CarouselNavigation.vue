<script setup lang="ts">
  import type { CarouselApi } from '@/components/ui/carousel';

  const props = defineProps<{ carouselApi: CarouselApi }>();
  const { selectedIndex, scrollSnaps, navigateTo } = useCarouselNavigation(
    props.carouselApi
  );
</script>

<template>
  <div class="flex gap-2">
    <slot
      v-for="(_, index) in scrollSnaps"
      :key="index"
      name="dot"
      :is-selected="selectedIndex === index"
      :navigate="() => navigateTo(index)"
    >
      <button
        class="w-3 h-3 rounded-full transition-colors duration-300"
        :class="selectedIndex === index ? 'bg-primary' : 'bg-muted'"
        @click="navigateTo(index)"
      />
    </slot>
  </div>
</template>
