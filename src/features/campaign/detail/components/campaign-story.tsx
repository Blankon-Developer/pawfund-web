"use client"

import { cn } from "@/utils"
import Markdown from "react-markdown"

export function CampaignStory({ story }: { story: string }) {
  return (
    <>
      <p className="mt-4 mb-4 text-lg font-bold">Campaign Story</p>
      <div
        className={cn(
          "prose max-w-none dark:prose-dark",
          "prose-headings:my-1 prose-headings:text-base prose-headings:font-semibold",
          "prose-p:my-1",
          "prose-ol:my-1 prose-ul:my-1",
          "prose-blockquote:my-2",
          "prose-hr:my-3.5",
          "prose-img:my-2 prose-img:rounded-xl",
          "prose-strong:font-semibold"
        )}
      >
        <Markdown>{story}</Markdown>
      </div>
    </>
  )
}
