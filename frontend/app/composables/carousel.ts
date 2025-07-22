import { ref, onMounted } from 'vue';
import type { CarouselApi } from '@/components/ui/carousel';

export function useCarouselNavigation(carouselApi: CarouselApi) {
  const selectedIndex = ref(0);
  const scrollSnaps = ref<number[]>([]);

  const updateNavigation = () => {
    if (!carouselApi) return;
    scrollSnaps.value = carouselApi.scrollSnapList();
    selectedIndex.value = carouselApi.selectedScrollSnap();
  };

  onMounted(() => {
    if (!carouselApi) return;
    updateNavigation();
    carouselApi.on('reInit', updateNavigation).on('select', updateNavigation);
  });

  const navigateTo = (index: number) => carouselApi?.scrollTo(index);

  return {
    selectedIndex,
    scrollSnaps,
    navigateTo,
  };
}
