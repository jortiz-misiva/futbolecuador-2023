import { SearchResponse } from './../interfaces/search';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { apiClient } from '@/boot/axios';
import { Ref } from 'vue';

interface Options {
  autoload?: boolean;
  limit?: number;
  offset?: number;
}

const search = async (
  valor: string,
  type: string,
  limit: number,
  offset: number
): Promise<SearchResponse> => {
  const { data } = await apiClient.get<SearchResponse>(
    `/noticias/buscaritem/${type}/${limit}/${offset}`,
    {
      params: {
        valor: valor.trim(),
      },
    }
  );

  return data;
};

const useSearch = (
  term: Ref<string | null>,
  type: Ref<'tag' | 'categoria' | 'noticias'>,
  options?: Options
) => {
  const { autoload = true, limit = 20, offset = 0 } = options || {};

  const searchQuery = useInfiniteQuery<SearchResponse>(
    ['search', type, term],
    ({ pageParam = offset }) =>
      search(term.value ?? '', type.value, limit, pageParam),
    {
      enabled: autoload && !!term.value && term.value.trim().length >= 3,
      // staleTime: 60 * 60_000,
      getNextPageParam: (lastPage, allPages) => {
        const pageParam = allPages
          .map((resp) => resp.resultados)
          .flat(1).length;
        if (pageParam < lastPage.total) return pageParam;
        return undefined;
      },
    }
  );
  return {
    searchQuery,
  };
};

export default useSearch;
