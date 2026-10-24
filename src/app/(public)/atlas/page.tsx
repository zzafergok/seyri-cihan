import {
  AtlasScreen,
  type AtlasScreenProps,
} from '@/features/routes/public/atlas';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicAtlas');
export default function AtlasPage(props: AtlasScreenProps) {
  return <AtlasScreen {...props} />;
}
