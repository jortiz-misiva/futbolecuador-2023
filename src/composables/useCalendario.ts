import { Torneo } from '../interfaces/scoreboards';
import { apiClient } from '@/boot/axios';
import { useQuery } from '@tanstack/vue-query';
import { CalendarioPartidos } from '@/interfaces/partidos';
import { Ref } from 'vue';
// import useHistoryStore from '@/stores/history';

interface Options {
  enabled?: boolean;
}

const getTorneos = async () => {
  const { data: torneos } = await apiClient.get<Torneo[]>('/partidos/torneos');
  if (!torneos) throw new Error('No se encontraron torneos');
  return torneos;
};

const getCalendario = async (
  rondaId?: string,
  fecha?: number,
  torneoId?: string
) => {
  let fechaId = fecha;

  if (!fecha) {
    const torneos = await getTorneos();
    fechaId = Number(
      torneos.find((x) => x.id == +(torneoId ?? 0))?.fecha_activa ?? '0'
    );
  }

  const { data: calendario } = await apiClient.get<CalendarioPartidos>(
    `/partidos/calendario/${rondaId}/${fechaId}`
  );

  if (!calendario) throw new Error('No se encontraron calendarios');

  return calendario;
};

const useCalendario = (
  rondId: Ref<string>,
  fecha: Ref<number | undefined>,
  torneoId: Ref<number>,
  options?: Options
) => {
  const { enabled = true } = options || {};

  // const { calendarios, torneos } = useHistoryStore();

  if (!fecha.value) {
    fecha.value = 2;
  }

  const torneosQuery = useQuery(['torneos'], getTorneos, {
    enabled,
    // initialData: torneos,
  });

  const calendarioQuery = useQuery(
    ['calendario', rondId, fecha, torneoId],
    () => getCalendario(rondId.value, fecha?.value),
    {
      enabled,
      // initialData: () =>
      //   calendarios[`${torneoId.value}:${rondId.value}:${fecha?.value}`],
    }
  );

  return {
    calendarioQuery,
    torneosQuery,
  };
};

export default useCalendario;
