import { MainContainer } from "@/components/main-container"
import { H1, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function Page() {
  return (
    <MainContainer className="h-[200vh]">
      <div className="mt-4">
        <H1>Hello, world!</H1>
        <Text className="mt-1 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing euo
          cumque sit repellendus accusamus consequatur! Veritatis eli bg-red-100
          perspiciatis nihil mollitia natus et at qui esse nectibus
          quidem tempore tempora aspernatur animi!
        </Text>
        <Button className="mt-3 mr-2">
          Click Here <ArrowRight />
        </Button>
        <Link href="/campaigns">Campaigns</Link>
      </div>
    </MainContainer>
  )
}
