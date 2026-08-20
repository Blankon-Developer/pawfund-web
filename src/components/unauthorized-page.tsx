import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shadcn-ui/empty"
import { UserLockIcon } from "lucide-react"
import { Button } from "@/shadcn-ui/button"
import { useRouter } from "next/navigation"

export function UnauthorizedPage() {
  const router = useRouter()
  return (
    <main className="flex h-dvh items-center justify-center p-4">
      <Empty className="py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserLockIcon />
          </EmptyMedia>
          <EmptyTitle>Unauthorized</EmptyTitle>
          <EmptyDescription>
            You&apos;re not authorized to access this page.
          </EmptyDescription>
        </EmptyHeader>
        <div className="mx-auto flex">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => router.replace("/")}
          >
            Return to Home
          </Button>
        </div>
      </Empty>
    </main>
  )
}
