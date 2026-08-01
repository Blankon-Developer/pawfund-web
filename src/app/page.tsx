import { ToggleTheme } from "@/components/toggle-theme"
import { H1, Text } from "@/components/typography"
import { Button } from "@/shadcn-ui/button"
import { ArrowRight } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-svh space-y-6 p-6">
      <ToggleTheme />
      <div>
        <H1>Hello, world!</H1>
        <Text className="mt-1 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cumque
          sit repellendus accusamus consequatur! Veritatis eligendi,
          perspiciatis nihil mollitia natus et at qui esse necessitatibus quidem
          tempore tempora aspernatur animi!
        </Text>
        <Button className="mt-3">
          Click Here <ArrowRight />
        </Button>
      </div>
    </main>
  )
}
