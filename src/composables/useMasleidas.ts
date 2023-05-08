import { useQuery } from '@tanstack/vue-query';
import { apiClient } from 'src/boot/axios';
import { Noticia } from 'src/interfaces/stories';

const getMasleidas = async (limit = 3, dias = 15): Promise<Noticia[]> => {
  const { data } = await apiClient.get<Noticia[]>(
    `/noticias/masleidas/${limit}/${dias}`
  );
  return data;
};

const useMasleidas = (limit = 3, dias = 15) => {
  const masleidasQuery = useQuery(
    ['stories', 'masleidas', limit, dias],
    () => getMasleidas(limit, dias)
    // {
    //   staleTime: 60 * 60_000,
    // }
  );
  return {
    masleidasQuery,
  };
};

export default useMasleidas;
