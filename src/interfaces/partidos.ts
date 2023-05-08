export interface CalendarioPartidos {
  id: string;
  total: number;
  fecha: number;
  fecha_activa: string;
  partidos: Partido[];
}

export interface Partido {
  id: number;
  dm: string;
  state: number;
  minute_match: number;
  result: string;
  schedule_id: number;
  live: number;
  datafactory_id: null;
  mt: MT[];
}

export interface MT {
  id: number;
  local: Local;
  visitante: Local;
}

export interface Local {
  name: string;
  short_name: string;
  shield_big: null | string;
}

export interface DetallePartido {
  partido: PartidoDetalle;
  local: LocalDetalle;
  visitante: LocalDetalle;
  acciones: Accion[];
}

export interface Accion {
  text: string;
  match_time: number;
}

export interface LocalDetalle {
  informacion: Informacion;
  jugadores: Jugador[];
}

export interface Informacion {
  name: string;
  short_name: string;
  shield_big: string;
}

export interface Jugador {
  nombre: string;
  minuto: number;
}

export interface PartidoDetalle {
  id: number;
  dm: string;
  state: number;
  minute_match: number;
  result: string;
  og_image: null | string;
}
