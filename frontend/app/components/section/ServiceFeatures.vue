<script setup lang="ts">
  import { motion } from 'motion-v';

  interface IFeature {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
  }

  const features: IFeature[] = $tm('serviceFeatures.features');
</script>

<template>
  <section class="bg-background py-20 md:py-32">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12">
        <motion.h2
          class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground mb-4"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('serviceFeatures.title') }}
        </motion.h2>
        <motion.p
          class="text-xl text-muted-foreground max-w-2xl mx-auto"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('serviceFeatures.description') }}
        </motion.p>
      </div>

      <motion.div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :transition="{ duration: 0.5 }"
      >
        <motion.div
          v-for="(feature, index) in features"
          :key="feature.id"
          class="flex flex-col items-center text-center p-6 bg-card dark:bg-card/80 rounded-xl shadow-md border border-border/50 dark:border-border/30"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 50,
            delay: 0.2 + index * 0.1,
          }"
          :in-view-options="{ amount: 0.3, once: true }"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            :class="feature.color"
          >
            <span class="text-3xl">{{ $rt(feature.icon) }}</span>
          </div>
          <h3 class="text-xl font-bold mb-2 text-foreground">
            {{ $rt(feature.title) }}
          </h3>
          <p class="text-muted-foreground">
            {{ $rt(feature.description) }}
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
