<script setup lang="ts">
  import { motion } from 'motion-v';
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
      <motion.button
        class="w-3 h-3 rounded-full transition-colors duration-300"
        :class="selectedIndex === index ? 'bg-primary scale-110' : 'bg-muted'"
        :animate="{ scale: selectedIndex === index ? 1.2 : 1, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
        @click="navigateTo(index)"
      />
    </slot>
  </div>
</template>
