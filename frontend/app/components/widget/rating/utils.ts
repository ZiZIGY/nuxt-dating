import { cva, type VariantProps } from 'class-variance-authority';
export const ratingVariants = cva('inline-flex items-center gap-1', {
  variants: {
    size: {
      sm: '[&_.star-icon]:size-4',
      md: '[&_.star-icon]:size-5',
      lg: '[&_.star-icon]:size-6',
    },
    color: {
      primary: '[&_.star-icon.filled]:text-primary',
      secondary: '[&_.star-icon.filled]:text-secondary',
      destructive: '[&_.star-icon.filled]:text-destructive',
      default: '[&_.star-icon.filled]:text-foreground',
    },
    editable: {
      true: '[&_.star-item]:cursor-pointer [&_.star-item]:transition-transform [&_.star-item:hover]:scale-110',
      false: '[&_.star-item]:cursor-default',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
    editable: false,
  },
});

export type RatingVariants = VariantProps<typeof ratingVariants>;
