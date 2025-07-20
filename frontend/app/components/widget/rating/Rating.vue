<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/lib/utils';
  import { type RatingVariants, ratingVariants } from '.';

  interface Props {
    modelValue?: number;
    max?: number;
    editable?: boolean;
    size?: RatingVariants['size'];
    color?: RatingVariants['color'];
    class?: HTMLAttributes['class'];
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    max: 5,
    editable: false,
    size: 'md',
    color: 'primary',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: number];
  }>();

  const hoverValue = ref<number | null>(null);

  const displayValue = computed(() => {
    return hoverValue.value !== null ? hoverValue.value : props.modelValue;
  });

  const setRating = (value: number) => {
    if (props.editable) {
      emit('update:modelValue', value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (props.editable) {
      hoverValue.value = value;
    }
  };

  const handleMouseLeave = () => {
    hoverValue.value = null;
  };
</script>

<template>
  <div
    :class="
      cn(
        ratingVariants({
          size: props.size,
          color: props.color,
          editable: props.editable,
        }),
        props.class
      )
    "
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="i in props.max"
      :key="i"
      class="star-item"
      @mouseenter="handleMouseEnter(i)"
      @click="setRating(i)"
    >
      <Icon
        v-if="i <= displayValue"
        name="line-md:star-filled"
        class="star-icon filled"
      />
      <Icon
        v-else
        name="line-md:star"
        class="star-icon text-muted"
      />
    </div>
  </div>
</template>
