<script setup lang="ts">
  import { useTemplateRef } from 'vue';
  import { useExplodingHearts } from '~/composables/hearts';

  const props = withDefaults(
    defineProps<{
      maxHearts?: number;
      generationRate?: number;
      colors?: string[];
      minHeartSize?: number;
      maxHeartSize?: number;
      minHeartOpacity?: number;
      maxHeartOpacity?: number;
      heartVelocityX?: number;
      heartVelocityYMin?: number;
      heartVelocityYMax?: number;
      fragmentCount?: number;
      fragmentMinSpeed?: number;
      fragmentMaxSpeed?: number;
      fragmentMinGravity?: number;
      fragmentMaxGravity?: number;
      fragmentOpacityDecay?: number;
      fragmentLifeDecay?: number;
      fragmentMinLife?: number;
      fragmentMaxLife?: number;
      heartRotationSpeed?: number;
      fragmentRotationSpeed?: number;
      heartPathSize?: number;
    }>(),
    {
      maxHearts: 30,
      generationRate: 2,
      colors: () => [
        'oklch(0.645 0.246 16.439)',
        'oklch(0.704 0.191 22.216)',
        'oklch(0.769 0.188 70.08)',
      ],
      minHeartSize: 15,
      maxHeartSize: 40,
      minHeartOpacity: 0.1,
      maxHeartOpacity: 0.8,
      heartVelocityX: 0.5,
      heartVelocityYMin: 0.5,
      heartVelocityYMax: 2,
      fragmentCount: 15,
      fragmentMinSpeed: 1,
      fragmentMaxSpeed: 4,
      fragmentMinGravity: 0.1,
      fragmentMaxGravity: 0.2,
      fragmentOpacityDecay: 0.02,
      fragmentLifeDecay: 0.02,
      fragmentMinLife: 0.8,
      fragmentMaxLife: 1.2,
      heartRotationSpeed: 0.2,
      fragmentRotationSpeed: 2,
      heartPathSize: 24,
    }
  );

  const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');

  const { handleCanvasClick } = useExplodingHearts(canvasRef, props);
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <canvas
      ref="canvasRef"
      class="absolute top-0 left-0 w-full h-full pointer-events-auto"
      @click="handleCanvasClick"
    />
  </div>
</template>

<style scoped>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
