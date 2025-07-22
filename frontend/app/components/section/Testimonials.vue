<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { CarouselApi } from '@/components/ui/carousel';

  const api = ref<CarouselApi>();
  const selectedIndex = ref(0);
  const scrollSnaps = ref<number[]>([]);

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
    scrollSnaps.value = carouselApi.scrollSnapList();
    selectedIndex.value = carouselApi.selectedScrollSnap();
    carouselApi
      .on('reInit', () => {
        scrollSnaps.value = carouselApi.scrollSnapList();
        selectedIndex.value = carouselApi.selectedScrollSnap();
      })
      .on('select', () => {
        selectedIndex.value = carouselApi.selectedScrollSnap();
      });
  };

  const onDotButtonClick = (index: number) => {
    api.value?.scrollTo(index);
  };

  interface ITestimonial {
    id: number;
    name: string;
    photo: string;
    text: string;
    rating: number;
  }

  const testimonials = computed(
    () => $tm('testimonials.items') as ITestimonial[]
  );
</script>

<template>
  <section class="bg-muted/30 dark:bg-muted/10 py-20 md:py-32 overflow-hidden">
    <div class="container mx-auto px-4 md:px-6">
      <div class="text-center mb-12">
        <motion.h2
          class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground mb-4"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50 }"
        >
          {{ $t('testimonials.title') }}
        </motion.h2>
        <motion.p
          class="text-xl text-muted-foreground max-w-2xl mx-auto"
          :initial="{ y: 50, opacity: 0 }"
          :while-in-view="{ y: 0, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 50, delay: 0.1 }"
        >
          {{ $t('testimonials.description') }}
        </motion.p>
      </div>

      <div class="relative mt-16 max-w-5xl mx-auto">
        <UiCarousel
          class="w-full"
          :opts="{ loop: true, align: 'start' }"
          @init-api="setApi"
        >
          <UiCarouselContent>
            <UiCarouselItem
              v-for="item in testimonials"
              :key="item.id"
            >
              <div
                class="bg-card dark:bg-card/80 rounded-xl p-8 shadow-lg border border-border/50 dark:border-border/30 flex flex-col md:flex-row items-center gap-8 h-full select-none"
              >
                <div class="flex-shrink-0">
                  <UiAvatar class="size-32 border-4 border-primary/30">
                    <UiAvatarImage
                      :src="$rt(item.photo)"
                      :alt="$rt(item.name)"
                    />
                    <UiAvatarFallback>
                      {{ $rt(item.name).charAt(0) }}
                    </UiAvatarFallback>
                  </UiAvatar>
                </div>
                <div class="flex-grow text-center md:text-left">
                  <div class="flex justify-center md:justify-start mb-2">
                    <WidgetRating :model-value="item.rating" />
                  </div>
                  <p class="text-lg text-foreground italic mb-4">
                    {{ $rt(item.text) }}
                  </p>
                  <p class="font-bold text-foreground">
                    {{ $rt(item.name) }}
                  </p>
                </div>
              </div>
            </UiCarouselItem>
          </UiCarouselContent>
        </UiCarousel>
        <div class="flex justify-center items-center gap-4 mt-8">
          <button
            v-for="(_, index) in scrollSnaps"
            :key="index"
            class="w-3 h-3 rounded-full transition-colors duration-300"
            :class="selectedIndex === index ? 'bg-primary' : 'bg-muted'"
            @click="onDotButtonClick(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
