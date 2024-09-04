import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

type PlaceholderContentProps = {
  text?: string;
};

export default function PlaceholderContent({ text }: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none ">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative">

            <h1>{text ?? "Em construção"}</h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
