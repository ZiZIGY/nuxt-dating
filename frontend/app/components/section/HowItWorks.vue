<script setup lang="ts">
  import { motion } from 'motion-v';

  const steps = [
    {
      icon: 'line-md:account-add',
      title: $t('howItWorks.steps.register.title'),
      description: $t('howItWorks.steps.register.description'),
    },
    {
      icon: 'line-md:heart-twotone',
      title: $t('howItWorks.steps.match.title'),
      description: $t('howItWorks.steps.match.description'),
    },
    {
      icon: 'line-md:chat',
      title: $t('howItWorks.steps.chat.title'),
      description: $t('howItWorks.steps.chat.description'),
    },
    {
      icon: 'line-md:coffee-twotone',
      title: $t('howItWorks.steps.date.title'),
      description: $t('howItWorks.steps.date.description'),
    },
  ];
</script>

<template>
  <section class="bg-muted/30 dark:bg-muted/10 py-20 md:py-32">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12">
        <motion.h2
          class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground mb-4"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('howItWorks.title') }}
        </motion.h2>
        <motion.p
          class="text-xl text-muted-foreground max-w-2xl mx-auto"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('howItWorks.description') }}
        </motion.p>
      </div>

      <motion.div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :transition="{ duration: 0.5 }"
      >
        <motion.div
          v-for="(step, index) in steps"
          :key="index"
          class="flex flex-col items-center text-center bg-card dark:bg-card/80 rounded-xl p-6 shadow-md border border-border/50 dark:border-border/30"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 50,
            delay: 0.2 + index * 0.1,
          }"
          :in-view-options="{ once: true, amount: 0.3 }"
        >
          <div
            class="rounded-full bg-primary/10 p-4 mb-6 text-primary flex items-center justify-center h-20 w-20 shadow-sm"
          >
            <Icon
              :name="step.icon"
              class="size-10"
            />
          </div>
          <h3 class="text-xl font-bold mb-3">{{ step.title }}</h3>
          <p class="text-muted-foreground">{{ step.description }}</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
