import { H1, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function Page() {
  return (
    <main className="h-[200vh] min-h-svh space-y-6 p-6">
      <div>
        <H1>Hello, world!</H1>
        <Text className="mt-1 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cumque
          sit repellendus accusamus consequatur! Veritatis eligendi,
          perspiciatis nihil mollitia natus et at qui esse necessitatibus quidem
          tempore tempora aspernatur animi!
        </Text>
        <Button className="mt-3 mr-2">
          Click Here <ArrowRight />
        </Button>
        <Link href="/campaigns">Campaigns</Link>
      </div>
    </main>
  )
}
