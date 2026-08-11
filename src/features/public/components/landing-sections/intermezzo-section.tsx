"use client"

import Image from "next/image"

import { FlowerShape } from "@/assets/shape/flower"
import { PawCircular } from "@/assets/icons/paw-circular"
import { PawRawShape } from "@/assets/shape/paw-raw"
import { Button } from "@/shadcn-ui/button"

import AnimalMeal from "../../assets/landing/animal-meal.svg"
import AnimalRescue from "../../assets/landing/animal-rescue.svg"
import AnimalTreatment from "../../assets/landing/animal-treatment.png"
import LendHand from "../../assets/landing/lend-hand.svg"
import SmileyCat from "../../assets/landing/smiley-cat.svg"

function IntermezzoSection() {
  return (
    <section className="flex flex-col items-center">
      <PawCircular className="mt-14 size-16" />
      <h3 className="mt-3 font-heading text-4xl">Did You Know?</h3>
      <p className="mt-5 max-w-5xl text-center text-lg">{`Every year, millions of stray animals struggle to survive on the streets. Lack of food, disease, and abandonment make their lives incredibly difficult. Here's why your donation can make a life-changing difference.`}</p>

      <div className="mt-10 grid grid-cols-6 grid-rows-[auto_auto_auto_auto] gap-3">
        <div className="relative col-span-6 row-span-2 flex items-start overflow-clip rounded-4xl bg-card p-8 lg:col-span-3 lg:row-span-4">
          <div className="maxw z-10 lg:max-w-64">
            <h6 className="text-lg font-bold">
              The Hard Truth About Stray Animals
            </h6>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-2">
              <PawRawShape className="mt-1 size-4" />
              <p>70% of stray animals suffer from malnutrition & disease.</p>
              <PawRawShape className="mt-1 size-4" />
              <p>1 in 10 kittens survives their first year without help.</p>
              <PawRawShape className="mt-1 size-4" />
              <p>Every hour, hundreds of animals are abandoned.</p>
            </div>
          </div>
          <FlowerShape className="absolute -bottom-10 -left-10 z-0 size-28 rotate-24" />
          <Image
            className="absolute top-0 right-0 z-0 h-[calc(100%+0.5rem)] w-auto opacity-35 sm:opacity-100 dark:brightness-70"
            src={LendHand.src}
            alt="Lend a Hand"
            width={300}
            height={300}
          />
        </div>
        <div className="relative col-span-6 row-span-1 flex items-center gap-1 overflow-clip rounded-4xl bg-card p-8 lg:col-span-3 lg:row-span-3">
          <div className="z-10">
            <h6 className="text-lg font-bold">{"But There's Hope!"}</h6>
            <p className="mt-2">
              {
                "With Paw Fund, you can donate, sponsor meals, fund medical care, and giving them a second chance at life. Join us in making a difference!"
              }
            </p>
          </div>
          <Image
            src={SmileyCat.src}
            alt="Smiley Cat"
            width={300}
            height={300}
            className="size-24 sm:size-36 dark:brightness-80"
          />
          <FlowerShape className="absolute -right-10 -bottom-10 z-0 size-24 text-rose-300 dark:text-rose-400/20" />
        </div>
        <div className="relative col-span-2 flex items-center justify-between gap-2 overflow-clip rounded-3xl bg-card p-4 sm:p-6 lg:col-span-1 lg:row-span-1">
          <div className="z-10">
            <h6 className="text-lg font-bold">5.5K+</h6>
            <p className="text-sm">Rescues</p>
          </div>
          <Image
            className="z-10 w-8 sm:w-10 dark:brightness-80"
            src={AnimalRescue.src}
            alt="Animal Rescue"
            width={300}
            height={300}
          />
          <FlowerShape className="absolute -top-5 -left-5 z-0 size-14" />
        </div>
        <div className="relative col-span-2 flex items-center justify-between gap-2 overflow-clip rounded-3xl bg-card p-4 sm:p-6 lg:col-span-1 lg:row-span-1">
          <div className="z-10">
            <h6 className="text-lg font-bold">50K+</h6>
            <p className="text-sm">Meals Served</p>
          </div>
          <Image
            className="z-10 w-6 sm:w-8 dark:brightness-80"
            src={AnimalMeal.src}
            alt="Animal Meal"
            width={300}
            height={300}
          />
          <FlowerShape className="absolute -top-5 -left-5 z-0 size-14" />
        </div>
        <div className="relative col-span-2 flex items-center justify-between gap-2 overflow-clip rounded-3xl bg-card p-4 sm:p-6 lg:col-span-1 lg:row-span-1">
          <div className="z-10 w-1/2 sm:w-auto">
            <h6 className="text-lg font-bold">10K+</h6>
            <p className="text-sm wrap-break-word">Treatments</p>
          </div>
          <Image
            className="z-10 w-9 sm:w-11 dark:brightness-80"
            src={AnimalTreatment.src}
            alt="Animal Treatment"
            width={300}
            height={300}
          />
          <FlowerShape className="absolute -top-5 -left-5 z-0 size-14" />
        </div>
      </div>

      <Button
        size={"lg"}
        className="mt-8 bg-foreground px-6 text-background hover:bg-foreground/90"
      >
        Join Us & Be Their Hero
      </Button>
    </section>
  )
}

export { IntermezzoSection }
