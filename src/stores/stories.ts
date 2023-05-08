import { CatagResponse } from './../interfaces/catag';
import { defineStore } from 'pinia';
import { apiServer } from 'src/boot/axios';
import { Noticia, Rotativas } from 'src/interfaces/stories';
import { AuthorResponse } from '@/interfaces/author';
import { ref } from 'vue';

const useStoriesStore = defineStore('stories', () => {
  const rotativas = ref<Rotativas>({
    noticias: [],
    editorial: null,
  });
  const principales = ref<Noticia[]>([]);
  const videos = ref<Noticia[]>([]);
  const catag = ref<{
    [key: string]: CatagResponse;
  }>({});

  const author = ref<{
    [key: string]: AuthorResponse;
  }>({});

  const preFetchNoticias = async () => {
    try {
      const [
        { data: rotativasData },
        { data: principalesData },
        { data: videosData },
      ] = await Promise.all([
        apiServer.get<Rotativas>('/noticias/rotativas/9'),
        apiServer.get<Noticia[]>('/noticias/principales/33/0'),
        apiServer.get<Noticia[]>('/noticias/videos/4/0'),
      ]);

      rotativas.value = rotativasData;
      principales.value = principalesData;
      videos.value = videosData;
    } catch (error) {
      console.log('Algo ha salido mal al recuperar las noticias.');
    }
  };

  const preFetchCatTag = async (
    type: string,
    term: string
  ): Promise<CatagResponse | undefined> => {
    if (catag.value[`${type}:${term}`]) return catag.value[`${type}:${term}`];

    try {
      const { data } = await apiServer.get<CatagResponse>(
        `/noticias/${type}/${term}/20/0`
      );

      catag.value[`${type}:${term}`] = data;
      return data;
    } catch (error) {
      console.log(
        `Algo ha salido mal al recuperar ${type} con el term ${term}`
      );
    }
  };

  const preFetchAuthor = async (
    nick: string
  ): Promise<AuthorResponse | undefined> => {
    if (author.value[nick]) return author.value[nick];

    try {
      const { data } = await apiServer.get<AuthorResponse>(
        `/noticias/autor/${nick}/20/0`
      );
      author.value[nick] = data;
      return data;
    } catch (error) {
      console.log('Algo ha salido mal al recuperar el autor.');
    }
  };

  return {
    preFetchNoticias,
    preFetchCatTag,
    preFetchAuthor,
    author,
    catag,
    rotativas,
    principales,
    videos,
  };
});

export default useStoriesStore;
