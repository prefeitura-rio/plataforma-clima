"use client";

import * as React from "react";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";


export function InfoButton() {

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button
          className="rounded-full w-8 h-8 bg-background"
          variant="outline"
          size="icon"
        >
          <Info className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
          <Info className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500  dark:scale-100" />
          <span className="sr-only">Info</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-1/2">
        <div className="mx-auto w-full h-[400px] max-w-sm">
          <DrawerHeader>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}