<script setup lang="ts">
  import { motion } from 'motion-v';

  interface FAQQuestion {
    question: string;
    answer: string;
  }

  const faqQuestions = computed(() => $tm('faq.questions') as FAQQuestion[]);
</script>

<template>
  <section class="py-20 md:py-32 bg-muted/30 dark:bg-muted/10">
    <div class="container mx-auto px-4 md:px-6">
      <motion.h2
        class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground mb-12 text-center"
        :initial="{ y: 50, opacity: 0 }"
        :while-in-view="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50 }"
      >
        {{ $t('faq.title') }}
      </motion.h2>
      <UiAccordion
        type="single"
        collapsible
        class="space-y-4"
      >
        <UiAccordionItem
          v-for="(question, index) in faqQuestions"
          :key="index"
          :value="'item-' + index"
        >
          <motion.div
            :initial="{ y: 20, opacity: 0 }"
            :while-in-view="{ y: 0, opacity: 1 }"
            :transition="{ type: 'spring', stiffness: 50, delay: index * 0.1 }"
          >
            <UiAccordionTrigger
              class="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              {{ $rt(question.question) }}
            </UiAccordionTrigger>
            <UiAccordionContent class="text-muted-foreground mt-2">
              {{ $rt(question.answer) }}
            </UiAccordionContent>
          </motion.div>
        </UiAccordionItem>
      </UiAccordion>
    </div>
  </section>
</template>
