<script setup lang="ts">
  import { motion } from 'motion-v';

  interface ValueItem {
    title: string;
    description: string;
  }

  const values: ValueItem[] = $tm('about.values.items');
</script>

<template>
  <section class="my-20 md:my-32">
    <div class="container mx-auto px-4 md:px-6">
      <motion.h2
        class="text-2xl font-bold mt-12 mb-4"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 0.6 }"
      >
        {{ $t('about.values.title') }}
      </motion.h2>
      <motion.ul
        class="list-disc pl-4"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 0.7 }"
      >
        <motion.li
          v-for="(value, index) in values"
          :key="index"
          class="mb-4"
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 50,
            delay: 0.7 + index * 0.1,
          }"
        >
          <h3 class="text-xl font-semibold">{{ $rt(value.title) }}</h3>
          <p>{{ $rt(value.description) }}</p>
        </motion.li>
      </motion.ul>
    </div>
  </section>
</template>
