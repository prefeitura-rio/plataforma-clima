"use client"

import * as React from "react"
import { Layers, Sun, Moon, Navigation2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MapControllersProps {
  onStyleChange: (style: string) => void
  onNavigationCenter: () => void
}

export function MapControllers({ onStyleChange, onNavigationCenter }: MapControllersProps) {
  return (
    <div className="absolute top-24 sm:inset-y-0  right-2 z-10 flex items-center">
      <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shadow-lg">
              <Layers className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="center" className="w-48">
            <DropdownMenuItem onClick={() => onStyleChange('mapbox://styles/mapbox/streets-v12')}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStyleChange('mapbox://styles/escritoriodedados/cm5mtyaev00bn01qpd39j2o97')}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Escuro</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shadow-lg" onClick={onNavigationCenter}>
          <Navigation2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}