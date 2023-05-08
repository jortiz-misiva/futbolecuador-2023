import { Category } from './story';

export interface Rotativas {
  noticias: Noticia[];
  editorial: Noticia | null;
}

export interface Noticia {
  id: number;
  title: string;
  subtitle: string;
  sponsored: number;
  created: string;
  openseccion: string;
  formato: string;
  images?: Images;
  category: Category;
  author: Author;
  slug: string;
}

export interface Images {
  thumb300: string;
  thumb640: string;
  name: string;
}

interface Author {
  nick: string;
}
