import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Add retro-tech/Mac-style cues: pixel border, pixel/arcade font, subtle shadow, bounce on hover
  "inline-flex items-center rounded-full border-2 border-black px-2.5 py-0.5 text-xs font-semibold font-['Press_Start_2P','system-ui',sans-serif] shadow-[2px_2px_0px_#222] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-105 hover:shadow-[4px_4px_0px_#222] active:scale-95 transition-transform duration-150",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Add a retro variant for special badges
        retro: "bg-white text-black border-2 border-black font-['Press_Start_2P','system-ui',sans-serif] shadow-[2px_2px_0px_#222] hover:shadow-[4px_4px_0px_#222] hover:bg-gray-100 hover:text-blue-700 hover:scale-110 transition-transform duration-150",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
