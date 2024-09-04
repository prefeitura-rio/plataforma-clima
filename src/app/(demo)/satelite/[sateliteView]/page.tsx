import { ContentLayout } from "@/components/admin-panel/content-layout";
import SateliteContent from "../satelite-content";

interface SateliteViewProps {
  params: {
    sateliteView: string;
  };
}

// Dynamic page component
export default async function SateliteView({ params }: SateliteViewProps) {
  const response = await fetch("https://rnc.dados.rio/GetData", {
    cache: 'no-store', // No caching, fresh data on every request
  });
  const apiResponse = await response.json();

  return (
    <ContentLayout title="Satélite">
      <SateliteContent sateliteView={params.sateliteView} data={apiResponse} />
    </ContentLayout>
  );
}

// Generate static paths for predefined satellite views
export async function generateStaticParams() {
  // List of static satellite views
  const satelliteViews = ['CP', 'KI', 'LI', 'SI', 'TT'];

  return satelliteViews.map((view) => ({
    params: {
      sateliteView: view,
    },
  }));
}
