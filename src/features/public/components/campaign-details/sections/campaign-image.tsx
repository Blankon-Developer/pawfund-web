import { Skeleton } from "@/shadcn-ui/skeleton"
import Image from "next/image"

export function CampaignImage(props: {
  isLoading?: boolean
  imageUrl: string
}) {
  return (
    <>
      {props.isLoading ? (
        <Skeleton className="aspect-video w-full rounded-3xl bg-gray-200" />
      ) : (
        <Image
          className="aspect-video w-full rounded-3xl bg-gray-200 object-cover"
          src={props.imageUrl}
          alt="Campaign Image"
          width={720}
          height={512}
        />
      )}
    </>
  )
}
