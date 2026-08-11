import { cn } from "@/utils"
import { SVGProps } from "react"

export function ArrowDownShape(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="23"
      height="48"
      viewBox="0 0 23 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("text-gray-800 dark:text-neutral-400", props.className)}
    >
      <rect x="10" width="3" height="14" rx="1.5" fill="currentColor" />
      <rect x="10" y="18" width="3" height="14" rx="1.5" fill="currentColor" />
      <path
        d="M13.0872 45.9297C12.2867 46.9739 10.7133 46.9739 9.91279 45.9297L4.70099 39.1317C3.44501 37.4935 5.19256 35.2576 7.08565 36.0807L10.7025 37.6533C11.2112 37.8744 11.7888 37.8744 12.2975 37.6533L15.9144 36.0807C17.8074 35.2576 19.555 37.4935 18.299 39.1317L13.0872 45.9297Z"
        fill="currentColor"
      />
    </svg>
  )
}
