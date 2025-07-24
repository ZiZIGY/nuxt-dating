<script setup lang="ts">
  import { motion } from 'motion-v';
</script>

<template>
  <main>
    <section class="my-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h1
          class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground mb-8"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.title') }}
        </motion.h1>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.introduction.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.introduction.content') }}
        </motion.p>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.dataCollection.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.dataCollection.content') }}
        </motion.p>
        <motion.ul 
          class="list-disc pl-5 mt-3"
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.2 }"
        >
          <motion.li
            v-for="(item, index) in $tm('privacy.dataCollection.items')"
            :key="index"
            :initial="{ x: -30, opacity: 0 }"
            :while-in-view="{ x: 0, opacity: 1 }"
            :in-view-options="{ once: true, amount: 0.3 }"
            :transition="{ type: 'spring', stiffness: 50, delay: 0.2 + index * 0.1 }"
          >
            {{ $rt(item) }}
          </motion.li>
        </motion.ul>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.dataSecurity.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.dataSecurity.content') }}
        </motion.p>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.cookiesPolicy.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.cookiesPolicy.content') }}
        </motion.p>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.thirdPartyServices.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.thirdPartyServices.content') }}
        </motion.p>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.yourRights.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.yourRights.content') }}
        </motion.p>
        <motion.ul 
          class="list-disc pl-5 mt-3"
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.2 }"
        >
          <motion.li
            v-for="(item, index) in $tm('privacy.yourRights.items')"
            :key="index"
            :initial="{ x: -30, opacity: 0 }"
            :while-in-view="{ x: 0, opacity: 1 }"
            :in-view-options="{ once: true, amount: 0.3 }"
            :transition="{ type: 'spring', stiffness: 50, delay: 0.2 + index * 0.1 }"
          >
            {{ $rt(item) }}
          </motion.li>
        </motion.ul>
      </div>
    </section>

    <section class="mb-8">
      <div class="container mx-auto px-4 md:px-6">
        <motion.h2 
          class="text-2xl font-semibold mb-4"
          :initial="{ x: -50, opacity: 0 }"
          :while-in-view="{ x: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('privacy.contactUs.title') }}
        </motion.h2>
        <motion.p
          :initial="{ y: 30, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :in-view-options="{ once: true, amount: 0.3 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('privacy.contactUs.content') }}
        </motion.p>
      </div>
    </section>

    <motion.p 
      class="text-sm text-gray-500 mt-12 container mx-auto px-4 md:px-6"
      :initial="{ y: 20, opacity: 0 }"
      :while-in-view="{ y: 0, opacity: 1 }"
      :in-view-options="{ once: true, amount: 0.3 }"
      :transition="{ type: 'spring', stiffness: 50, delay: 0.3 }"
    >
      {{ $t('privacy.lastUpdated') }}
    </motion.p>
  </main>
</template>
