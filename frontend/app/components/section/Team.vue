<script setup lang="ts">
  import { motion } from 'motion-v';

  interface TeamMember {
    name: string;
    position: string;
    photo: string;
    bio: string;
  }

  const teamMembers: TeamMember[] = $tm('about.team.members');
</script>

<template>
  <section class="my-20 md:my-32">
    <div class="container mx-auto px-4 md:px-6">
      <motion.h2
        class="text-2xl font-bold mt-12 mb-4"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 0.8 }"
      >
        {{ $t('about.team.title') }}
      </motion.h2>
      <motion.div
        class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
        :initial="{ y: 50, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 50, delay: 0.9 }"
      >
        <motion.div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="flex flex-col items-center"
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 50,
            delay: 0.9 + index * 0.1,
          }"
        >
          <UiAvatar class="size-32 mb-4">
            <UiAvatarImage
              :src="$rt(member.photo)"
              :alt="$rt(member.name)"
              class="object-cover"
            />
            <UiAvatarFallback>
              {{ $rt(member.name).charAt(0) }}
            </UiAvatarFallback>
          </UiAvatar>
          <h3 class="text-xl font-semibold">{{ $rt(member.name) }}</h3>
          <p class="text-muted-foreground">{{ $rt(member.position) }}</p>
          <p class="mt-2">{{ $rt(member.bio) }}</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
