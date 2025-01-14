"use client"

import * as React from "react"
import { Layers, Sun, Moon, Navigation2, Settings, Satellite } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

interface MapControllersProps {
  onStyleChange: (style: string) => void
  onNavigationCenter: () => void
  onOpacityChange: (opacity: number) => void
  opacity: number
}

export function MapControllers({ onStyleChange, onNavigationCenter, onOpacityChange, opacity }: MapControllersProps) {
  return (
    <div className="absolute top-24 sm:inset-y-0 right-2 z-10 flex items-center">
      <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shadow-lg">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start" className="w-48">
            <DropdownMenuLabel>Ajustes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Tema</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onStyleChange('mapbox://styles/mapbox/streets-v12')}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStyleChange('mapbox://styles/escritoriodedados/cm5mtyaev00bn01qpd39j2o97')}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Escuro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStyleChange('mapbox://styles/escritoriodedados/cm5wpz1qi006u01qvfounbvl1')}>
              <Satellite className="mr-2 h-4 w-4" />
              <span>Satélite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Opacidade</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Slider min={0.1} max={1} step={0.1} value={[opacity]} onValueChange={(value) => onOpacityChange(value[0])} />
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