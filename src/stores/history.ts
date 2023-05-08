import { apiServer } from 'src/boot/axios';
import { NoticiaAbierta } from './../interfaces/story';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  ResultadosTorneo,
  TablaOgImage,
  Torneo,
  TorneoImage,
} from '@/interfaces/scoreboards';
import { CalendarioPartidos, DetallePartido } from '@/interfaces/partidos';

const useHistoryStore = defineStore('history', () => {
  const matchOgImage = ref<{ [id: string]: string | null }>({});
  const partidosDetalle = ref<{ [id: string]: DetallePartido }>({});

  const torneos = ref<Torneo[]>([]);
  const scoreboards = ref<{ [id: string]: ResultadosTorneo }>({});
  const calendarios = ref<{ [id: string]: CalendarioPartidos }>({});

  const history = ref<{ [id: number]: NoticiaAbierta }>({});
  const prefetchedHistory = ref<{ [id: number]: NoticiaAbierta }>({});

  const preFetchCalendario = async (
    rondaId?: string,
    fecha?: string,
    torneoId?: string
  ) => {
    let fechaId = fecha;

    if (!fecha) {
      const torn = !torneos.value.length
        ? await preFetchTorneos()
        : torneos.value;
      fechaId = String(
        torn.find((x) => x.id == +(torneoId ?? 0))?.fecha_activa ?? 0
      );
    }

    const { data: calendario } = await apiServer.get<CalendarioPartidos>(
      `/partidos/calendario/${rondaId}/${fechaId}`
    );

    if (!calendario) throw new Error('No se encontraron calendarios');

    calendarios.value[`${torneoId}:${rondaId}:${fecha}`] = calendario;

    return calendario;
  };

  const preFetchTorneos = async () => {
    const { data } = await apiServer.get<Torneo[]>('/partidos/torneos');
    if (!data) throw new Error('No se encontraron torneos');
    torneos.value = data;
    return data;
  };

  const preFetchScoreboard = async (torneo?: number, round?: number) => {
    const { data: posiciones } = await apiServer.get<ResultadosTorneo>(
      `/tabla/posiciones/${torneo}/${round}`
    );

    if (!posiciones) throw new Error('No se encontraron posiciones');
    scoreboards.value[`${torneo}:${round}`] = posiciones;
    return posiciones;
  };

  const addNoticia = (noticia: NoticiaAbierta) => {
    const { id } = noticia;
    if (!history.value[id]) history.value[id] = noticia;
  };
  const addPrefetchNoticia = (noticia: NoticiaAbierta) => {
    const { id } = noticia;
    if (!prefetchedHistory.value[id]) prefetchedHistory.value[id] = noticia;
  };

  const preFetchMatchOgImage = async (id: string) => {
    try {
      const { data: image } = await apiServer.get<TorneoImage>(
        `/partidos/detalle/${id}`
      );

      if (!image) return;
      matchOgImage.value[id] = image.og_image;

      return image;
    } catch (error) {
      console.log(`Algo ha salido mal al obtener el og ${id}`);
    }
  };

  const preFetchTablaOgImage = async (serie: 'serie-a' | 'serie-b') => {
    try {
      const { data: image } = await apiServer.get<TablaOgImage>(
        `/tabla/detalle/${serie == 'serie-a' ? 0 : 1}`
      );

      if (!image) return;
      matchOgImage.value[serie] = image.og_image;

      return image;
    } catch (error) {
      console.log(`Algo ha salido mal al obtener el og ${serie}`);
    }
  };

  const preFetchNoticia = async (id: number) => {
    if (history.value[id]) return history.value[id];
    if (prefetchedHistory.value[id]) return prefetchedHistory.value[id];

    try {
      const { data: noticia } = await apiServer.get<NoticiaAbierta>(
        `/noticias/${id}`
      );

      if (!noticia) return;
      history.value[id] = noticia;

      return noticia;
    } catch (error) {
      console.log(`Algo ha salido mal al obtener la story ${id}`);
    }
  };

  const preFetcPartidoDetalle = async (id: number) => {
    if (history.value[id]) return history.value[id];
    if (prefetchedHistory.value[id]) return prefetchedHistory.value[id];

    try {
      const { data: partido } = await apiServer.get<DetallePartido>(
        `/partidos/info/${id}`
      );

      if (!partido) return;
      partidosDetalle.value[id] = partido;

      return partido;
    } catch (error) {
      console.log(`Algo ha salido mal al obtener el detalle del partido ${id}`);
    }
  };

  return {
    addPrefetchNoticia,
    preFetchNoticia,
    addNoticia,
    history,
    prefetchedHistory,
    matchOgImage,
    preFetchMatchOgImage,
    preFetchTorneos,
    preFetchScoreboard,
    torneos,
    scoreboards,
    preFetchCalendario,
    calendarios,
    preFetchTablaOgImage,
    preFetcPartidoDetalle,
    partidosDetalle,
  };
});

export default useHistoryStore;
