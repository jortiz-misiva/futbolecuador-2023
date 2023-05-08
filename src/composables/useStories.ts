import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { apiClient } from 'src/boot/axios';
import { Noticia, Rotativas } from 'src/interfaces/stories';
import useStoriesStore from 'src/stores/stories';

interface Options {
  autoload?: boolean;
}

const getVideos = async (limit = 4, offset = 0): Promise<Noticia[]> => {
  const { data } = await apiClient.get<Noticia[]>(
    `/noticias/videos/${limit}/${offset}`
  );
  return data;
};

const getRotativas = async (limit = 9): Promise<Rotativas> => {
  const { data } = await apiClient.get<Rotativas>(
    `/noticias/rotativas/${limit}`
  );
  return data;
};

const getPrincipales = async (limit = 33, offset = 0): Promise<Noticia[]> => {
  const { data } = await apiClient.get<Noticia[]>(
    `/noticias/principales/${limit}/${offset}`
  );
  return data;
};

const useStories = (options?: Options) => {
  const { autoload = true } = options || {};

  const storiesStore = useStoriesStore();
  const { principales, rotativas, videos } = storeToRefs(storiesStore);

  const rotativasQuery = useQuery<Rotativas>(
    ['stories', 'rotativas'],
    () => getRotativas(),
    {
      initialData: rotativas,
      enabled: autoload,
      // staleTime: 60 * 30_000,
    }
  );

  const principalesQuery = useQuery<Noticia[]>(
    ['stories', 'principales'],
    () => getPrincipales(),
    {
      initialData: principales,
      enabled: autoload,
      // staleTime: 60 * 60_000,
    }
  );

  const videosQuery = useQuery(['stories', 'videos'], () => getVideos(), {
    initialData: videos,
    enabled: autoload,
    // staleTime: 60 * 60_000,
  });

  // const principalesInfinityQuery = useInfiniteQuery(
  //   ['stories', 'principales', 'infinity'],
  //   ({ pageParam = 20 }) => getPrincipales(20, pageParam),
  //   {
  //     enabled: autoload,
  //     staleTime: 60 * 5_000,
  //     getNextPageParam: (lastPage, allPages) => {
  //       const pageParam = allPages.flat(1).length + 20;
  //       return pageParam;
  //     },
  //   }
  // );

  // const preFetchStories = () => {
  //   queryClient.prefetchQuery(
  //     ['stories', 'principales'],
  //     () => getPrincipales(),
  //     {
  //       staleTime: 60 * 5_000,
  //     }
  //   );
  //   queryClient.prefetchQuery(['stories', 'rotativas'], () => getRotativas(), {
  //     staleTime: 60 * 2_000,
  //   });
  // };

  return {
    rotativasQuery,
    principalesQuery,
    // principalesInfinityQuery,
    videosQuery,
    // preFetchStories,
  };
};

export default useStories;
