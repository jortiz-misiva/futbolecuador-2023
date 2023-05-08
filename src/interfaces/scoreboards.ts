export interface Torneo {
  id: number;
  name: string;
  active_round: number;
  fecha_activa?: string;
  orden: string;
  rondas: Ronda[];
}

export interface Ronda {
  id: number;
  name: string;
}

export interface ResultadosTorneo {
  nombre: string;
  posiciones: Posiciones[];
}

export interface Posiciones {
  id: number;
  name: string;
  short_name: string;
  mini_shield: null | string;
  points: number;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  gd: number;
  change: number;
  updown: number;
  seccion: string;
  seccion_id: string;
  'slug-categoria': string;
}

export interface TorneoImage {
  og_image: string | null;
}

export interface TablaOgImage {
  link: string;
  og_image: string;
}
