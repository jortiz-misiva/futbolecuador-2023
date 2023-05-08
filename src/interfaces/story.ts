import { Images } from './stories';

export interface NoticiaAbierta {
  id: number;
  title: string;
  subtitle: string;
  sponsored: number;
  created: string;
  openseccion: string;
  lead: string;
  body: string;
  origen: string;
  widget: string;
  formato: string;
  author: Author;
  images?: Images;
  category: Category;
  tags: Tag[];
}

interface Author {
  nick?: string;
  first_name?: string;
  last_name?: string;
  twitter?: string;
}

export interface Category {
  name: string;
  'slug-categoria': string;
}

export interface Tag {
  name: string;
  slug: string;
}
