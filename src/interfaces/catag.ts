import { Noticia } from './stories';

export interface CatagResponse {
  nombre: string;
  total: number;
  noticias: Noticia[];
}
