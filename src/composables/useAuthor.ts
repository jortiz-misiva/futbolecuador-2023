import useStoriesStore from 'src/stores/stories';
import { apiClient } from '@/boot/axios';
import { AuthorResponse } from '@/interfaces/author';
import { InfiniteData, useInfiniteQuery } from '@tanstack/vue-query';
import { Ref } from 'vue';

interface Options {
  limit?: number;
  autoload?: boolean;
}

const getAuthor = async (
  nick: string,
  limit = 20,
  offset = 0
): Promise<AuthorResponse> => {
  const { data } = await apiClient.get<AuthorResponse>(
    `/noticias/autor/${nick}/${limit}/${offset}`
  );
  return data;
};

const useAuthor = (nick: Ref<string>, options?: Options) => {
  const { autoload = true } = options || {};

  const storiesStore = useStoriesStore();

  const authorQuery = useInfiniteQuery(
    ['author', { nick }],
    ({ pageParam = 0 }) => getAuthor(nick.value, options?.limit, pageParam),
    {
      enabled: autoload,
      // staleTime: 60 * 60_000,
      initialData: () => {
        const storedAuthor = storiesStore.author[nick.value];
        if (storedAuthor) return;
        const data: InfiniteData<AuthorResponse> = {
          pageParams: [20],
          pages: [storedAuthor],
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

  return {
    authorQuery,
  };
};

export default useAuthor;
