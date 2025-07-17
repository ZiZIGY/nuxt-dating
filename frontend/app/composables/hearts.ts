import {
  shallowRef,
  onMounted,
  onBeforeUnmount,
  computed,
  type Ref,
} from 'vue';
import { useRafFn } from '@vueuse/core';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  velocity: {
    x: number;
    y: number;
  };
  color: string;
  isExploding: boolean;
  fragments: Fragment[];
}

interface Fragment {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  velocity: {
    x: number;
    y: number;
  };
  gravity: number;
  life: number;
  maxLife: number;
}

export interface ExplodingHeartsOptions {
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
}

/**
 * Композабл для создания анимации взрывающихся сердечек
 * Сердечки плавают снизу вверх и взрываются при клике
 */
export function useExplodingHearts(
  canvasRef: Ref<HTMLCanvasElement | null>,
  options: ExplodingHeartsOptions
) {
  const {
    maxHearts = 30,
    generationRate = 2,
    colors = [
      'oklch(0.645 0.246 16.439)',
      'oklch(0.704 0.191 22.216)',
      'oklch(0.769 0.188 70.08)',
    ],
    minHeartSize = 15,
    maxHeartSize = 40,
    minHeartOpacity = 0.1,
    maxHeartOpacity = 0.8,
    heartVelocityX = 0.5,
    heartVelocityYMin = 0.5,
    heartVelocityYMax = 2,
    fragmentCount = 15,
    fragmentMinSpeed = 1,
    fragmentMaxSpeed = 4,
    fragmentMinGravity = 0.1,
    fragmentMaxGravity = 0.2,
    fragmentOpacityDecay = 0.02,
    fragmentLifeDecay = 0.02,
    fragmentMinLife = 0.8,
    fragmentMaxLife = 1.2,
    heartRotationSpeed = 0.2,
    fragmentRotationSpeed = 2,
    heartPathSize = 24,
  } = options;

  const safeColors = computed<string[]>(() => {
    return Array.isArray(colors) && colors.length > 0
      ? colors
      : ['oklch(0.645 0.246 16.439)'];
  });

  const hearts = shallowRef<Heart[]>([]);
  const ctx = shallowRef<CanvasRenderingContext2D | null>(null);

  const { play: playSound } = useSound('/sounds/bubblepop.mp3');

  const { inc: incrementCount } = useExplodedHeartsCount();

  let lastTimestamp = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let timeSinceLastHeart = 0;

  const heartPath = new Path2D(
    'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  );

  const generateHeart = () => {
    if (!canvasRef.value || hearts.value.length >= maxHearts) return;

    const id = Date.now() + Math.random();
    const size = minHeartSize + Math.random() * (maxHeartSize - minHeartSize);
    const colorsList = safeColors.value;
    const colorIndex = Math.floor(Math.random() * colorsList.length);
    const color = colorsList[colorIndex] || 'oklch(0.645 0.246 16.439)';

    hearts.value.push({
      id,
      x: Math.random() * canvasWidth,
      y: canvasHeight + size,
      size,
      opacity:
        minHeartOpacity + Math.random() * (maxHeartOpacity - minHeartOpacity),
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * heartVelocityX,
        y:
          -heartVelocityYMin -
          Math.random() * (heartVelocityYMax - heartVelocityYMin),
      },
      color,
      isExploding: false,
      fragments: [],
    });
  };

  const checkHeartCollision = (x: number, y: number): Heart | null => {
    for (let i = hearts.value.length - 1; i >= 0; i--) {
      const heart = hearts.value[i];
      if (!heart || heart.isExploding) continue;

      const dx = heart.x - x;
      const dy = heart.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < heart.size / 2) {
        return heart;
      }
    }
    return null;
  };

  const explodeHeart = (heart: Heart | null) => {
    if (!heart) return;

    heart.isExploding = true;

    playSound();
    incrementCount();

    const actualFragmentCount = Math.floor(
      fragmentCount * Math.random() * 0.3 + fragmentCount * 0.7
    );

    for (let i = 0; i < actualFragmentCount; i++) {
      const angle = ((Math.PI * 2) / actualFragmentCount) * i;
      const speed =
        fragmentMinSpeed +
        Math.random() * (fragmentMaxSpeed - fragmentMinSpeed);

      heart.fragments.push({
        x: heart.x,
        y: heart.y,
        size: heart.size / (2 + Math.random() * 2),
        opacity: 1,
        rotation: Math.random() * 360,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        gravity:
          fragmentMinGravity +
          Math.random() * (fragmentMaxGravity - fragmentMinGravity),
        life: 1,
        maxLife:
          fragmentMinLife + Math.random() * (fragmentMaxLife - fragmentMinLife),
      });
    }
  };

  const handleCanvasClick = (event: MouseEvent) => {
    if (!canvasRef.value) return;

    const rect = canvasRef.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedHeart = checkHeartCollision(x, y);
    if (clickedHeart) {
      explodeHeart(clickedHeart);
    }
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, heart: Heart) => {
    ctx.save();
    ctx.translate(heart.x, heart.y);
    ctx.rotate((heart.rotation * Math.PI) / 180);
    ctx.scale(heart.size / heartPathSize, heart.size / heartPathSize);
    ctx.translate(-heartPathSize / 2, -heartPathSize / 2);

    ctx.globalAlpha = heart.opacity;
    ctx.fillStyle = heart.color;
    ctx.fill(heartPath);

    ctx.restore();
  };

  const drawFragment = (
    ctx: CanvasRenderingContext2D,
    fragment: Fragment,
    color: string
  ) => {
    ctx.save();
    ctx.translate(fragment.x, fragment.y);
    ctx.rotate((fragment.rotation * Math.PI) / 180);
    ctx.scale(fragment.size / heartPathSize, fragment.size / heartPathSize);
    ctx.translate(-heartPathSize / 2, -heartPathSize / 2);

    ctx.globalAlpha = fragment.opacity;
    ctx.fillStyle = color;
    ctx.fill(heartPath);

    ctx.restore();
  };

  const resizeCanvas = () => {
    if (!canvasRef.value) return;

    const container = canvasRef.value.parentElement;
    if (container) {
      canvasWidth = container.clientWidth;
      canvasHeight = container.clientHeight;
      canvasRef.value.width = canvasWidth;
      canvasRef.value.height = canvasHeight;
    }
  };

  const { pause, resume } = useRafFn(
    (time) => {
      if (!ctx.value || !canvasRef.value) return;

      const now = typeof time === 'number' ? time : performance.now();
      const deltaTime = lastTimestamp ? (now - lastTimestamp) / 16 : 1;

      lastTimestamp = now;

      timeSinceLastHeart += deltaTime;
      const heartGenerationInterval = 1000 / generationRate / 16;

      if (timeSinceLastHeart >= heartGenerationInterval) {
        generateHeart();
        timeSinceLastHeart = 0;
      }

      ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);

      hearts.value = hearts.value.filter((heart) => {
        if (heart.isExploding) {
          heart.fragments = heart.fragments.filter((fragment) => {
            fragment.x += fragment.velocity.x * deltaTime;
            fragment.y += fragment.velocity.y * deltaTime;

            fragment.velocity.y += fragment.gravity * deltaTime;
            fragment.rotation += fragmentRotationSpeed * deltaTime;

            fragment.opacity = Math.max(
              0,
              fragment.opacity - fragmentOpacityDecay * deltaTime
            );
            fragment.life -= fragmentLifeDecay * deltaTime;

            if (fragment.life > 0 && ctx.value) {
              drawFragment(ctx.value, fragment, heart.color);
              return true;
            }
            return false;
          });

          return heart.fragments.length > 0;
        }

        heart.x += heart.velocity.x * deltaTime;
        heart.y += heart.velocity.y * deltaTime;
        heart.rotation += heartRotationSpeed * deltaTime;

        if (
          heart.y + heart.size < 0 ||
          heart.x + heart.size < 0 ||
          heart.x - heart.size > canvasWidth
        ) {
          return false;
        }

        if (ctx.value) {
          drawHeart(ctx.value, heart);
        }
        return true;
      });
    },
    { immediate: false }
  );

  onMounted(() => {
    if (canvasRef.value) {
      ctx.value = canvasRef.value.getContext('2d');
      resizeCanvas();

      window.addEventListener('resize', resizeCanvas);
      resume();
    }
  });

  onBeforeUnmount(() => {
    pause();
    window.removeEventListener('resize', resizeCanvas);
  });

  return {
    hearts,
    handleCanvasClick,
    explodeHeart,
    checkHeartCollision,
  };
}

/**
 * Композабл для подсчета лопнутых сердечек
 * Сохраняет счетчик в localStorage
 */
export function useExplodedHeartsCount() {
  const counter = useLocalStorage('hearts-count', 0);

  const { count, inc } = useCounter(counter);

  return {
    count,
    inc,
  };
}
