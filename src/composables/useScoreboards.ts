import { ResultadosTorneo, Torneo } from './../interfaces/scoreboards';
import { apiClient } from '@/boot/axios';
import { useQuery } from '@tanstack/vue-query';
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

const getScoreboard = async (torneo?: number, round?: number) => {
  const { data: posiciones } = await apiClient.get<ResultadosTorneo>(
    `/tabla/posiciones/${torneo}/${round}`
  );

  if (!posiciones) throw new Error('No se encontraron posiciones');

  return posiciones;
};

const useScoreboards = (
  torneoId: Ref<number>,
  roundId: Ref<number>,
  options?: Options
) => {
  const { enabled = true } = options || {};

  // const { scoreboards, torneos } = useHistoryStore();

  const torneosQuery = useQuery(['torneos'], getTorneos, {
    // staleTime: 60 * 15_000,
    enabled,
    // initialData: torneos,
  });

  const scoreboardQuery = useQuery(
    ['tabla', torneoId, roundId],
    () => getScoreboard(torneoId.value, roundId.value),
    {
      enabled,
      // initialData: scoreboards[`${torneoId.value}:${roundId?.value}`],
    }
  );

  return {
    scoreboardQuery,
    torneosQuery,
  };
};

export default useScoreboards;
