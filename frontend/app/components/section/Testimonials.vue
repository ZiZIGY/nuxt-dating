<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { CarouselApi } from '@/components/ui/carousel';

  const api = ref<CarouselApi>();

  const setApi = (carouselApi: CarouselApi) => (api.value = carouselApi);

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
          :opts="{ loop: true, align: 'center' }"
          @init-api="setApi"
        >
          <UiCarouselContent>
            <UiCarouselItem
              v-for="item in testimonials"
              :key="item.id"
            >
              <motion.div
                class="bg-card dark:bg-card/80 rounded-xl p-8 shadow-lg border border-border/50 dark:border-border/30 flex flex-col md:flex-row items-center gap-8 h-full select-none"
                :initial="{ opacity: 0, y: 50 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.2 }"
                :in-view-options="{ amount: 0.3 }"
              >
                <div class="flex-shrink-0">
                  <div
                    class="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30"
                  >
                    <img
                      :src="$rt(item.photo)"
                      :alt="$rt(item.name)"
                      class="w-full h-full object-cover"
                    />
                  </div>
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

          <div class="flex justify-center items-center gap-4 mt-8">
            <UiCarouselPrevious
              variant="outline"
              size="icon"
              class="static"
            />
            <div class="flex gap-2">
              <button
                v-for="(_, index) in testimonials"
                :key="index"
                class="w-3 h-3 rounded-full transition-colors duration-300"
                :class="
                  api?.selectedScrollSnap() === index
                    ? 'bg-primary'
                    : 'bg-muted'
                "
                @click="api?.scrollTo(index)"
              />
            </div>
            <UiCarouselNext
              variant="outline"
              size="icon"
              class="static"
            />
          </div>
        </UiCarousel>
      </div>
    </div>
  </section>
</template>
