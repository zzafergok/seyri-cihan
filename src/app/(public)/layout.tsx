import { AtlasShell } from '@/features/atlas/atlas-shell';
import '@/features/atlas/atlas.css';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AtlasShell>{children}</AtlasShell>;
}
