import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border",
        // پرفروش — deep navy badge, ivory text
        bestseller: "bg-yolo-navy text-yolo-ivory border-transparent font-bold dark:bg-yolo-ivory dark:text-yolo-navy",
        // توصیه باریستا — slightly lighter navy
        barista: "bg-[#2D4A7A] text-yolo-ivory border-transparent font-bold dark:bg-[#3A5C96] dark:text-white",
        // جدید — natural green
        new: "bg-yolo-green text-white border-transparent font-bold",
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
