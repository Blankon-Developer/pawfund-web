import { PawCircular } from "@/assets/icons/paw-circular"
import { Button } from "@/shadcn-ui/button"
import { maskAddress } from "@/utils/mask-address"

export function Donors({}: { contractAddress: string }) {
  return (
    <>
      <p className="font-semibold">Who Supported Us</p>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div className="flex items-center gap-1" key={idx}>
            <PawCircular
              className="size-14 [--paw-circ-bg:var(--color-gray-300)] dark:[--paw-circ-bg:var(--color-neutral-700)]"
              bgColor="var(--paw-circ-bg)"
              fgColor="#FFFFFF"
            />
            <div>
              <p className="text-sm text-muted-foreground">
                {maskAddress("0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C", 5)}
              </p>
              <p className="mt-0.5 text-sm font-medium">10 USDC</p>
            </div>
          </div>
        ))}
        <Button variant={"outline"} className="col-span-2 px-6">
          See all donations
        </Button>
      </div>
    </>
  )
}
