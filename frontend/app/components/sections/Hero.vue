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

  const decorDelays = [0.5, 0.7, 0.9, 1.1, 1.3];

  const stats = [
    { number: '10K+', label: 'Активных пользователей' },
    { number: '85%', label: 'Успешных знакомств' },
    { number: '24/7', label: 'Поддержка' },
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

    <div class="container relative z-10 mx-auto px-4 md:px-6">
      <motion.div
        :variants="containerVariants"
        :initial="'hidden'"
        :animate="'visible'"
        class="grid gap-12 md:grid-cols-2 md:items-center"
      >
        <!-- Левая колонка с текстом (с гласморфизмом) -->
        <motion.div
          class="flex flex-col space-y-8 p-6 sm:p-8 rounded-xl bg-white/70 dark:bg-card/50 backdrop-blur-md border border-border/50 dark:border-white/10 shadow-lg"
          :variants="itemVariants"
        >
          <motion.h1
            :variants="itemVariants"
            class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground"
          >
            Найдите свою <span class="text-primary">настоящую любовь</span> уже
            сегодня
          </motion.h1>

          <motion.p
            :variants="itemVariants"
            class="text-xl text-muted-foreground max-w-md"
          >
            Современный сервис знакомств, который помогает найти идеальную пару
            на основе ваших интересов и предпочтений.
          </motion.p>

          <motion.div
            :variants="itemVariants"
            class="flex flex-wrap gap-4"
          >
            <UiButton size="lg">Начать знакомиться</UiButton>
            <UiButton
              size="lg"
              variant="outline"
            >
              Узнать больше
            </UiButton>
          </motion.div>

          <motion.div
            :variants="itemVariants"
            class="grid grid-cols-3 gap-4 pt-8 border-t border-border/40"
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          :variants="imageVariants"
          class="relative flex justify-center pointer-events-none"
        >
          <div
            class="relative h-[400px] w-[400px] rounded-full bg-muted/50 flex items-center justify-center"
          >
            <div class="overflow-hidden rounded-full aspect-square">
              <img
                alt="Счастливая пара"
                class="relative z-10 shadow-xl object-cover size-full"
                src="/images/hero-image.webp"
              />
            </div>

            <!-- Декоративные элементы вокруг изображения с анимацией -->
            <motion.div
              :variants="decorVariants"
              :initial="'hidden'"
              :animate="'visible'"
              :transition="{ delay: decorDelays[2] }"
              class="absolute top-10 -left-6 h-12 w-12 rounded-full bg-primary"
            />
            <motion.div
              :initial="{ scale: 0, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :transition="{ delay: decorDelays[3], type: 'spring' }"
              :variants-animate="pulseVariants"
              class="absolute bottom-20 -right-8 h-16 w-16 rounded-full bg-secondary"
            />
            <motion.div
              :initial="{ scale: 0, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :transition="{ delay: decorDelays[4], type: 'spring' }"
              :variants-animate="pulseVariants"
              class="absolute -bottom-2 left-20 h-10 w-10 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
