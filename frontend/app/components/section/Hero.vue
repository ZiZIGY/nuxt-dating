<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { VariantType } from 'motion-v';

  const containerVariants = {
    hidden: { opacity: 0 } as VariantType,
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    } as VariantType,
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 } as VariantType,
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    } as VariantType,
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 } as VariantType,
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 50,
        delay: 0.3,
      },
    } as VariantType,
  };

  // Анимация для декоративных элементов
  const decorVariants = {
    hidden: { scale: 0, opacity: 0 } as VariantType,
    visible: {
      scale: 1,
      opacity: 0.8,
      transition: {
        type: 'spring' as const,
        stiffness: 50,
        delay: 0.5,
      },
    } as VariantType,
  };

  const pulseVariants = {
    initial: { scale: 1 } as VariantType,
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const,
      },
    } as VariantType,
  };

  const stats = [
    { number: '10K+', label: $t('hero.stats.users') },
    { number: '85%', label: $t('hero.stats.success') },
    { number: '24/7', label: $t('hero.stats.support') },
  ];
</script>

<template>
  <section class="relative overflow-hidden bg-background py-20 md:py-32">
    <ClientOnly>
      <WidgetExplodingHearts
        :max-hearts="40"
        :generation-rate="1.5"
        :colors="[
          'oklch(0.645 0.246 16.439)',
          'oklch(0.704 0.191 22.216)',
          'oklch(0.769 0.188 70.08)',
        ]"
      />
    </ClientOnly>

    <div
      class="container relative z-10 mx-auto px-4 md:px-6 pointer-events-none"
    >
      <motion.div
        :variants="containerVariants"
        :initial="'hidden'"
        :animate="'visible'"
        class="grid gap-12 md:grid-cols-2 md:items-center"
      >
        <motion.div
          class="flex flex-col space-y-8 p-6 sm:p-8 rounded-xl bg-white/70 dark:bg-background/40 backdrop-blur-md border border-border/50 dark:border-border/30 shadow-lg pointer-events-auto"
          :variants="itemVariants"
        >
          <motion.h1
            :variants="itemVariants"
            class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground"
          >
            {{ $t('hero.title.start') }}
            <span class="text-primary">{{ $t('hero.title.highlight') }}</span>
            {{ $t('hero.title.end') }}
          </motion.h1>

          <motion.p
            :variants="itemVariants"
            class="text-xl text-muted-foreground max-w-md"
          >
            {{ $t('hero.description') }}
          </motion.p>

          <motion.div
            :variants="itemVariants"
            class="flex flex-wrap gap-4"
          >
            <UiButton size="lg">{{ $t('hero.buttons.start') }}</UiButton>
            <UiButton
              size="lg"
              variant="outline"
            >
              {{ $t('hero.buttons.learnMore') }}
            </UiButton>
          </motion.div>

          <motion.div
            :variants="itemVariants"
            class="space-y-8"
          >
            <UiSeparator class="my-2" />

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div
                v-for="(stat, index) in stats"
                :key="index"
                class="text-center"
              >
                <motion.div
                  :initial="{ scale: 0.8, opacity: 0 }"
                  :animate="{ scale: 1, opacity: 1 }"
                  :transition="{ delay: 0.5 + index * 0.1, type: 'spring' }"
                >
                  <h3 class="text-2xl font-bold text-primary">
                    {{ stat.number }}
                  </h3>
                  <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          :variants="imageVariants"
          class="relative flex justify-center"
        >
          <div
            class="relative max-h-[400px] w-[100%] max-w-[400px] rounded-full bg-muted/50 flex items-center justify-center"
          >
            <div class="overflow-hidden rounded-full aspect-square">
              <img
                :alt="$t('hero.image.alt')"
                class="relative z-10 shadow-xl object-cover size-full"
                src="/images/hero-image.webp"
              />
            </div>

            <!-- Декоративные элементы вокруг изображения с анимацией -->
            <motion.div
              v-for="i in 3"
              :key="i"
              :variants="decorVariants"
              :initial="'hidden'"
              :animate="'visible'"
              :transition="{ delay: 0.5 }"
              class="absolute top-10 -left-6 h-12 w-12 rounded-full bg-primary"
            />
            <motion.div
              :initial="{ scale: 0, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :transition="{ delay: 0.7, type: 'spring' }"
              :variants-animate="pulseVariants"
              class="absolute bottom-20 -right-8 h-16 w-16 rounded-full bg-secondary"
            />
            <motion.div
              :initial="{ scale: 0, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :transition="{ delay: 0.9, type: 'spring' }"
              :variants-animate="pulseVariants"
              class="absolute -bottom-2 left-20 h-10 w-10 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
