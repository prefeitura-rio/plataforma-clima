import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface PluviometroProps {
  params: {
    pluviometroView: string[];
  };
}

export default function RadarPage({ params }: PluviometroProps) {

  return (
    <ContentLayout title="Pluviômetros">
      <PlaceholderContent />
    </ContentLayout>
  );
}
