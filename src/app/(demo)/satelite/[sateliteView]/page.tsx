import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import SateliteContent from "../satelite-content";

interface SateliteViewProps {
  params: {
    sateliteView: string;
  };
}

// Add generateStaticParams function
export async function generateStaticParams() {
  const staticPaths = ['CP', 'KI', 'LI', 'SI', 'TT'];

  return staticPaths.map((sateliteView) => ({
    sateliteView,
  }));
}

export default async function SateliteView({ params }: SateliteViewProps) {
  const response = await fetch("https://rnc.dados.rio/GetData", {
    cache: 'no-store'
  });
  const apiResponse = await response.json();

  return (
    <ContentLayout title="Satélite">
      <SateliteContent sateliteView={params.sateliteView} data={apiResponse} />
    </ContentLayout>
  );
}
