import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import SobreContent from "./sobre-content";

export default function RadarPage() {
  return (
    <ContentLayout title="Sobre">
      <SobreContent />
    </ContentLayout>
  );
}
