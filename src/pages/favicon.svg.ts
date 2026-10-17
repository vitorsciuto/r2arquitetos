// Favicon vetorial: o mesmo símbolo do cabeçalho.
import type { APIRoute } from 'astro';
import { simboloSvg } from '../lib/simbolo';

export const GET: APIRoute = () =>
  new Response(simboloSvg(), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
