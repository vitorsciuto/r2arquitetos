// Favicon em PNG de 32 px, para navegadores que não usam o SVG.
import type { APIRoute } from 'astro';
import { simboloPng } from '../lib/simbolo-png';

export const GET: APIRoute = () => simboloPng(32);
