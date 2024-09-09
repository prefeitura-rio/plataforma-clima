'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";
interface ProductOwenerProps {
  imagePaths: string[];
}

export default function ProductOwener({ imagePaths }: ProductOwenerProps) {
  const { theme } = useTheme();
  return (
    <Card className="rounded-lg border-none mb-4">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imagePaths.map((path, index) => (
            <div key={index} className="relative w-full h-12">
              <Image
                src={theme === "dark" ? path.replace("_dark", "_light") : path}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}