import {
  AtlasScreen,
  type AtlasScreenProps,
} from '@/features/routes/public/atlas';
import { createStaticMetadata } from '@/lib/metadata/page-metadata';

export const generateMetadata = createStaticMetadata('publicHome');

export default function PublicHomePage(props: AtlasScreenProps) {
  return <AtlasScreen {...props} />;
}
