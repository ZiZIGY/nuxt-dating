<script setup lang="ts">
  import { motion } from 'motion-v';
</script>

<template>
  <section class="mt-6 md:mt-8">
    <div class="container mx-auto px-4 md:px-6">
      <motion.h1
        class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground mb-8 text-center"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50 }"
      >
        {{ $t('about.title') }}
      </motion.h1>
      <motion.div
        class="prose prose-lg dark:prose-invert mx-auto"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
      >
        <p class="text-xl text-muted-foreground mb-8">
          {{ $t('about.intro') }}
        </p>

        <motion.h2
          class="text-2xl font-bold mt-12 mb-4"
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.2 }"
        >
          {{ $t('about.mission.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.3 }"
        >
          {{ $t('about.mission.description') }}
        </motion.p>

        <motion.h2
          class="text-2xl font-bold mt-12 mb-4"
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.4 }"
        >
          {{ $t('about.story.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.5 }"
        >
          {{ $t('about.story.description') }}
        </motion.p>
      </motion.div>
    </div>
  </section>
</template>
