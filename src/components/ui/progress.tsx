"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const [animatedValue, setAnimatedValue] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll trigger
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element comes into view
      }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [isVisible]);

  // Animate progress value when visible
  React.useEffect(() => {
    if (isVisible && animatedValue < (value || 0)) {
      const timer = setTimeout(() => {
        setAnimatedValue(prev => {
          const increment = Math.max(1, Math.ceil((value || 0) / 50)); // Smooth animation
          return Math.min(prev + increment, value || 0);
        });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isVisible, animatedValue, value]);

  // Reset animation when value changes
  React.useEffect(() => {
    setAnimatedValue(0);
    setIsVisible(false);
  }, [value]);

  return (
    <div className="relative" ref={progressRef}>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-green-500 h-full w-full flex-1 transition-all duration-1000 ease-out rounded-full"
          style={{ transform: `translateX(-${100 - animatedValue}%)` }}
        />
      </ProgressPrimitive.Root>
      <div 
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all duration-1000 ease-out"
        style={{ transform: `translateX(-${95 - animatedValue}%)` }}
      >
        <div className="absolute -top-12 right-0.5 text-black border-2 text-xs h-7 w-7 flex items-center justify-center rounded-full bg-white">
          You
        </div>
        <div className="absolute -top-4.5 right-2 text-black text-xs h-1 flex items-center justify-center">
          🔻
        </div>
        <div className="absolute top-2 right-0.5 text-black text-xs font-medium">
          {animatedValue}%
        </div>
      </div>
    </div>
  )
}

export { Progress }
