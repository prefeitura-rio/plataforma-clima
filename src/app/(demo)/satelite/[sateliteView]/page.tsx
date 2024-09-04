import { ContentLayout } from "@/components/admin-panel/content-layout";
import SateliteContent from "../satelite-content";

interface SateliteViewProps {
  params: {
    sateliteView: string;
  };
}

export const revalidate = 60;

export default async function SateliteView({ params }: SateliteViewProps) {
  const response = await fetch("https://rnc.dados.rio/GetData", {
    cache: 'no-store',
    next: { revalidate: 60 },
  });

  const apiResponse = await response.json();

  return (
    <ContentLayout title="Satélite">
      <SateliteContent sateliteView={params.sateliteView} data={apiResponse} />
    </ContentLayout>
  );
}
