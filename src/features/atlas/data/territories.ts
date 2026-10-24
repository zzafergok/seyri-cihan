import { z } from 'zod';
import { territorySchema } from '@/features/atlas/domain/schemas';
import records from '@/features/atlas/data/cshapes-ottoman.json';

// Reviewed CShapes 2.0 subset; never substitute a nearby snapshot for missing years.
// Attribution, pinned source, extraction method and limits: boundary-provenance.md.
export const territories = z.array(territorySchema).parse(records);
