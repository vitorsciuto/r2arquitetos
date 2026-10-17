// Ícone de tela inicial do iOS (180 px): o símbolo, sem cantos (o sistema arredonda).
import type { APIRoute } from 'astro';
import { simboloPng } from '../lib/simbolo-png';

export const GET: APIRoute = () => simboloPng(180);
