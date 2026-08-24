"use client"
import { NativeSelect, NativeSelectOption } from "@/shadcn-ui/native-select"
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextButton,
  PaginationPreviousButton,
} from "@/shadcn-ui/pagination"
import { Skeleton } from "@/shadcn-ui/skeleton"
import { Pagination as PaginationType } from "@/types/api.types"
import { cn } from "@/utils"

type PaginationItem = number | "ellipsis"

function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 2
): PaginationItem[] {
  if (totalPages <= 0) return []

  // Tidak perlu ellipsis
  const totalVisiblePages = siblingCount * 2 + 4

  if (totalPages <= totalVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)

  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  // Hanya ellipsis kanan
  if (!showLeftEllipsis && showRightEllipsis) {
    return [
      ...Array.from({ length: 3 + siblingCount * 2 }, (_, index) => index + 1),
      "ellipsis",
      totalPages,
    ]
  }

  // Hanya ellipsis kiri
  if (showLeftEllipsis && !showRightEllipsis) {
    const start = totalPages - (2 + siblingCount * 2)

    return [
      1,
      "ellipsis",
      ...Array.from(
        { length: totalPages - start + 1 },
        (_, index) => start + index
      ),
    ]
  }

  // Ellipsis kiri dan kanan
  return [
    1,
    "ellipsis",
    ...Array.from(
      {
        length: rightSibling - leftSibling + 1,
      },
      (_, index) => leftSibling + index
    ),
    "ellipsis",
    totalPages,
  ]
}

function CompoundedPagination({
  pagination = {
    current: 1,
    pageSize: 12,
    totalItems: 1,
    totalPages: 1,
  },
  isLoading,
  className,
  onPageChange,
}: {
  pagination?: PaginationType
  isLoading?: boolean
  onPageChange?: (page: number, pageSize: number) => void
  className?: string
}) {
  const { current, pageSize, totalPages } = pagination

  const pageItems = getPaginationItems(current, totalPages)

  if (isLoading) {
    return <Skeleton className={cn("h-12 w-full", className)} />
  }
  return (
    <Pagination className={className}>
      <PaginationContent className="w-full flex-col justify-between md:flex-row">
        <PaginationItem className="hidden md:block">
          <span className="text-sm text-muted-foreground">
            Page <span className="font-medium text-foreground">{current}</span>{" "}
            of <span className="font-medium text-foreground">{totalPages}</span>
          </span>
        </PaginationItem>

        <PaginationItem className="flex flex-wrap items-center gap-1">
          <PaginationPreviousButton
            onClick={() => onPageChange?.(current - 1, pageSize)}
            disabled={current == 1}
          />
          {pageItems.map((item, idx) => {
            if (item === "ellipsis") {
              return <PaginationEllipsis key={idx} />
            }
            return (
              <PaginationButton
                isActive={current == item}
                key={idx}
                onClick={() =>
                  current !== item && onPageChange?.(item, pageSize)
                }
              >
                {item}
              </PaginationButton>
            )
          })}
          <PaginationNextButton
            onClick={() => onPageChange?.(current + 1, pageSize)}
            disabled={current == totalPages}
          />
        </PaginationItem>

        <PaginationItem className="mt-1 flex items-center gap-4 md:mt-0">
          <span className="text-sm text-muted-foreground md:hidden">
            Page <span className="font-medium text-foreground">{current}</span>{" "}
            of <span className="font-medium text-foreground">{totalPages}</span>
          </span>
          <NativeSelect
            size="sm"
            className="w-28"
            onChange={(val) => onPageChange?.(1, Number(val.target.value))}
            value={pageSize}
          >
            <NativeSelectOption value={12}>12 / page</NativeSelectOption>
            <NativeSelectOption value={24}>24 / page</NativeSelectOption>
            <NativeSelectOption value={48}>48 / page</NativeSelectOption>
            <NativeSelectOption value={96}>96 / page</NativeSelectOption>
          </NativeSelect>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { CompoundedPagination }
