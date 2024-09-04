import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { LineChartComponent } from "@/components/ui/line-chart";
import Nav from "@/components/nav";

interface SateliteContentProps {
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

export default function SateliteContent({ sateliteView, data }: SateliteContentProps) {

  // Mapping data based on the [sateliteView]
  const satelliteData = {
    CP: data.cp,
    KI: data.ki,
    LI: data.li,
    SI: data.si,
    TT: data.tt,
  }[sateliteView.toUpperCase()];

  if (!satelliteData) {
    return <div>Error: Invalid satellite view selection</div>;
  }

  return (
    <Card className="rounded-lg border-none">
      <Nav sateliteView={sateliteView} />
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-64px-20px-24px-56px-48px)]">
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="col-span-12 sm:col-span-6">
              <LineChartComponent sateliteView={sateliteView} data={data} />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <Image
                src={`data:image/png;base64,${satelliteData.img}`}
                alt="Satellite Image"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
