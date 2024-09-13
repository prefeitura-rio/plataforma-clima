'use client'

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { LineChartComponent } from "@/components/ui/line-chart";
import { Rnd } from "react-rnd"; // Importando Rnd para arrastar e redimensionar
import Draggable from 'react-draggable';

interface GraficoContentProps {
  sateliteView: string;
  data: {
    cp: { img: string; val: string };
    ki: { img: string; val: string };
    li: { img: string; val: string };
    si: { img: string; val: string };
    tt: { img: string; val: string };
    time: string;
  };
}

export default function GraficoContent({ sateliteView, data }: GraficoContentProps) {



  return (
    <Rnd
      default={{
        x: 10,
        y: 10,
        width: 300,
        height: 300,
      }}
      minWidth={200}
      minHeight={150}
    // bounds="parent" // Limita o arrasto dentro do pai
    >
      <div className="w-full h-full">
        <LineChartComponent />
      </div>
    </Rnd>
  );
}
