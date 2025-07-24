<script setup lang="ts">
  const { t } = useI18n();
  
  useHead({
    title: t('meta.main.title'),
    meta: [
      { name: 'description', content: t('meta.main.description') },
      { name: 'keywords', content: t('meta.main.keywords') },
      { name: 'og:title', content: t('meta.main.og.title') },
      { name: 'og:description', content: t('meta.main.og.description') },
    ],
  });
</script>

<template>
  <main>
    <SectionHero />
    <SectionHowItWorks />
    <SectionServiceFeatures />
    <SectionTestimonials />
    <SectionFAQ />
  </main>
</template>
