import useStoriesStore from 'src/stores/stories';
import { CatagResponse } from '../interfaces/catag';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/vue-query';
import { apiClient } from 'src/boot/axios';
import { Ref } from 'vue';

export interface Options {
  autoloadInfinity?: boolean;
  autoloadNormal?: boolean;
}

const getCaTag = async (
  term: string,
  type: string,
  limit = 20,
  offset = 0
): Promise<CatagResponse> => {
  if (term === '') throw new Error(`No existe la ${type} con el term vacío`);
  const { data } = await apiClient.get<CatagResponse>(
    `/noticias/${type}/${term}/${limit}/${offset}`
  );
  return data;
};

const useCaTag = (
  term: Ref<string>,
  type: Ref<'categoria' | 'tag' | string>,
  options?: Options
) => {
  const { autoloadInfinity = true, autoloadNormal = true } = options || {};

  const storiesStore = useStoriesStore();

  const catagInfinityQuery = useInfiniteQuery<CatagResponse>(
    ['stories', type, term, 'infinity'],
    ({ pageParam = 0 }) => getCaTag(term.value, type.value, 20, pageParam),
    {
      enabled:
        autoloadInfinity &&
        type.value !== 'noticiaAbierta' &&
        term.value !== '',
      // staleTime: 60 * 60_000,
      initialData: () => {
        const catagStories = storiesStore.catag[`${type.value}:${term.value}`];

        if (!catagStories) return;

        const data: InfiniteData<CatagResponse> = {
          pageParams: [0],
          pages: [catagStories],
        };

        return data;
      },
      getNextPageParam: (lastPage, allPages) => {
        const pageParam = allPages.map((resp) => resp.noticias).flat(1).length;
        if (pageParam < lastPage.total) return pageParam;
        return undefined;
      },
    }
  );

  const catagQuery = useQuery<CatagResponse>(
    ['stories', type, term],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => getCaTag(term.value, type.value, 20, 0),
    {
      enabled: autoloadNormal && !!options && term.value != '',
      // staleTime: 60 * 60_000,
    }
  );

  return {
    catagInfinityQuery,
    catagQuery,
  };
};

export default useCaTag;
