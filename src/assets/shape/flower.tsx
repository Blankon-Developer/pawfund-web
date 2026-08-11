import { cn } from "@/utils"
import { SVGProps } from "react"

export function FlowerShape(
  props: SVGProps<SVGSVGElement> & { fill?: string }
) {
  return (
    <svg
      width="211"
      height="209"
      viewBox="0 0 211 209"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("text-gray-200 dark:text-neutral-800", props.className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M145.023 67.7241C217.894 22.5487 241.043 130.64 156.684 120.377C231.479 160.987 150.094 235.421 116.94 156.828C119.506 242.815 14.9704 209.158 66.1763 140.828C-6.69446 186.004 -30.0482 78.5582 54.5151 88.1752C-21.1259 48.0087 60.2597 -26.4252 94.2602 51.7243C90.8469 -33.8204 196.229 -0.605792 145.023 67.7241Z"
        fill="currentColor"
      />
    </svg>
  )
}
