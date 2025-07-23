<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { CarouselApi } from '@/components/ui/carousel';

  const api = ref<CarouselApi>();

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
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

      <UiCarousel
        class="w-full mt-16 max-w-5xl mx-auto"
        :opts="{ loop: true, align: 'start' }"
        @init-api="setApi"
      >
        <UiCarouselContent>
          <UiCarouselItem
            v-for="item in testimonials"
            :key="item.id"
          >
            <motion.div
              :initial="{ y: 50, opacity: 0 }"
              :while-in-view="{ y: 0, opacity: 1 }"
              :transition="{ type: 'spring', stiffness: 50 }"
              :in-view-options="{ once: true, amount: 0.3 }"
              class="bg-card dark:bg-card/80 rounded-xl p-8 shadow-lg border border-border/50 dark:border-border/30 flex flex-col md:flex-row items-center gap-8 h-full select-none"
            >
              <div class="flex-shrink-0">
                <UiAvatar class="size-32 border-4 border-primary/30">
                  <UiAvatarImage
                    class="object-cover"
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
            </motion.div>
          </UiCarouselItem>
        </UiCarouselContent>

        <div class="flex justify-between items-center mt-1.5 flex-wrap">
          <ClientOnly>
            <WidgetCarouselNavigation :carousel-api="api" />
            <div class="flex gap-3">
              <UiCarouselPrevious
                variant="outline"
                size="icon"
                class="relative inset-0 translate-0"
              />
              <UiCarouselNext
                variant="outline"
                size="icon"
                class="relative inset-0 translate-0"
              />
            </div>
          </ClientOnly>
        </div>
      </UiCarousel>
    </div>
  </section>
</template>
