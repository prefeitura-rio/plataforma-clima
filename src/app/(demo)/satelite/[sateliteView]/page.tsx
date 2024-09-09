import { ContentLayout } from "@/components/admin-panel/content-layout";
import SateliteContent from "../satelite-content";
import ProductOwener from "../product-owener";


interface SateliteViewProps {
  params: {
    sateliteView: string;
  };
}

export const revalidate = 60;

export default async function SateliteView({ params }: SateliteViewProps) {
  const response = await fetch("https://rnc.dados.rio/GetData", {
    // cache: 'no-store',
  });

  const apiResponse = await response.json();

  return (
    <ContentLayout title="Satélite">
      <ProductOwener imagePaths={["/LNCC_logo_dark.png", "/RNC_logo_dark.png", "/IMPA_logo_light.png"]} />
      <SateliteContent sateliteView={params.sateliteView} data={apiResponse} />
    </ContentLayout>
  );
}
