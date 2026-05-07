import PageHero from "../components/layout/PageHero";
import ResourceMap from "../components/map/ResourceMap";
import { images } from "../data/images";

export default function CultureMapPage() {
  return (
    <>
      <PageHero 
        title="文化地图" 
        subtitle="探索身边的文化场馆与公共文化空间。" 
        image={images.heroes.cultureMap} 
      />
      <ResourceMap />
    </>
  );
}
