import Image from "next/image"

import { ArrowDownShape } from "@/assets/shape/arrow-down"
import { FlowerShape } from "@/assets/shape/flower"
import { FluentEmojiFlatGrinningCatWithSmilingEyes } from "@/assets/icons/grinning-cat"
import { HopeShape } from "@/assets/icons/hope-shape"
import { FluentEmojiFlatKissingCat } from "@/assets/icons/kissing-cat"
import { PawHandShape } from "@/assets/shape/paw-hand"
import { PortalShape } from "@/assets/shape/portal"
import { Button } from "@/shadcn-ui/button"
import { cn } from "@/utils"

import PawCircPersp2 from "../../assets/landing/paw-circular-perspective-2.png"
import PawCircPersp from "../../assets/landing/paw-circular-perspective.png"

function HeroSection({ className }: { className?: string }) {
  return (
    <>
      <section
        className={cn(
          "relative flex h-[calc(100svh-4rem)] max-h-190 min-h-150 flex-col items-center justify-between gap-4 overflow-clip rounded-[40px] bg-card px-8 py-20 sm:max-h-180",
          className
        )}
      >
        <FlowerShape className="absolute bottom-40 -left-20 sm:bottom-4" />
        <FlowerShape className="absolute -right-20 bottom-96 scale-x-[-1] sm:bottom-4" />

        <FluentEmojiFlatKissingCat className="absolute top-28 right-[78%] size-12 rotate-12 sm:top-40 sm:right-[86%] sm:size-16 dark:brightness-80" />
        <PawHandShape className="absolute right-[65%] -bottom-72 sm:right-[70%] sm:-bottom-56 lg:-bottom-40 dark:brightness-90" />
        <PawHandShape className="absolute -bottom-72 left-[65%] scale-x-[-1] sm:-bottom-56 sm:left-[70%] lg:-bottom-40 dark:brightness-90" />
        <FluentEmojiFlatGrinningCatWithSmilingEyes className="absolute top-83 left-[80%] size-11 -rotate-16 sm:top-75 sm:left-[88%] sm:size-16 dark:brightness-80" />

        <Image
          src={PawCircPersp.src}
          alt="Paw Circular Perspective"
          className="absolute top-81 right-[80%] size-10 sm:top-72 sm:right-[72%] dark:brightness-80"
          width={100}
          height={100}
        />
        <Image
          src={PawCircPersp2.src}
          alt="Paw Circular Perspective"
          className="absolute top-28 left-[76%] size-12 dark:brightness-80"
          width={100}
          height={100}
        />

        <h1 className="relative z-10 mt-5 max-w-xl text-center font-heading text-6xl leading-20 sm:mt-10 sm:text-7xl">
          They <br className="sm:hidden" /> Need Your Helping Hand!
          <PortalShape className="absolute right-4 bottom-32 size-6 sm:bottom-0" />
          <HopeShape className="absolute top-0 -left-6 hidden size-7 sm:block" />
        </h1>
        <p className="z-10 mb-6 max-w-lg text-center text-lg font-medium">
          Help stray cats and animals get a better life. Every donation brings
          new hope!
        </p>
        <Button
          className="z-10 mb-32 bg-blue-600 px-7 py-6 text-lg font-medium hover:bg-blue-600/90 sm:mb-0 dark:bg-blue-700/90 dark:text-foreground dark:hover:bg-blue-700/80"
          size={"lg"}
        >
          Donate Now
        </Button>
      </section>
      <ArrowDownShape className="absolute left-1/2 z-10 -mt-6 -translate-x-1/2 transform" />
    </>
  )
}

export { HeroSection }
