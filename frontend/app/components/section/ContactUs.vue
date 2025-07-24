<script setup lang="ts">
  import { motion } from 'motion-v';
</script>

<template>
  <section class="my-20 md:my-32">
    <div class="container mx-auto px-4 md:px-6">
      <motion.h2
        class="text-2xl font-bold mt-12 mb-4"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 1.0 }"
      >
        {{ $t('about.contact.title') }}
      </motion.h2>
      <motion.p
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 1.1 }"
      >
        {{ $t('about.contact.description') }}
        {{ $config.public.contactEmail }}
      </motion.p>
      <motion.div
        class="flex flex-col md:flex-row gap-4 mt-6"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 1.2 }"
      >
        <UiButton>{{ $t('about.contact.button') }}</UiButton>
      </motion.div>
    </div>
  </section>
</template>
