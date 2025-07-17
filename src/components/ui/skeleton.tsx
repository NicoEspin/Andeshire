import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text" | "rectangular"
  width?: string | number
  height?: string | number
  animation?: "pulse" | "wave" | "none"
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = "default", 
    width, 
    height, 
    animation = "wave",
    style,
    ...props 
  }, ref) => {
    const baseClasses = "bg-muted"
    
    const variantClasses = {
      default: "rounded-md",
      circular: "rounded-full",
      text: "rounded-sm h-4",
      rectangular: "rounded-none"
    }
    
    const animationClasses = {
      pulse: "animate-pulse",
      wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      none: ""
    }

    const combinedStyle = {
      width,
      height,
      ...style
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          animationClasses[animation],
          className
        )}
        style={combinedStyle}
        role="status"
        aria-label="Loading..."
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
export type { SkeletonProps }