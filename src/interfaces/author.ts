import { Noticia } from './stories';

export interface AuthorResponse {
  autor: Autor;
  total: number;
  noticias: Noticia[];
}

interface Autor {
  first_name?: string;
  last_name?: string;
  nick?: string;
  mail: string;
  id: number;
  description: string;
  twitter?: string;
  created: string;
}
