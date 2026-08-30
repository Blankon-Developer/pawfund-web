import { PawCircular } from "@/assets/icons/paw-circular"
import Image from "next/image"

type FundraiserProps = {
  imageUrl?: string
  name: string
  address: string
}

export function Fundraiser(props: FundraiserProps) {
  return (
    <div className="flex items-center gap-2">
      {props.imageUrl ? (
        <Image
          className="size-12 rounded-full bg-secondary"
          src={props.imageUrl}
          alt="Fundraiser Image"
          width={72}
          height={72}
        />
      ) : (
        <PawCircular
          className="-ml-2 size-14 [--paw-circ-bg:var(--color-gray-300)] dark:[--paw-circ-bg:var(--color-neutral-700)]"
          bgColor="var(--paw-circ-bg)"
          fgColor="#FFFFFF"
        />
      )}
      <div>
        <p className="font-medium">{props.name}</p>
        <p className="text-sm text-muted-foreground">{props.address}</p>
      </div>
    </div>
  )
}
