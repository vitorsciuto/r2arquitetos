// Símbolo da marca em PNG de 512 px: `logo` nos dados estruturados (JSON-LD).
import type { APIRoute } from 'astro';
import { simboloPng } from '../lib/simbolo-png';

export const GET: APIRoute = () => simboloPng(512);
