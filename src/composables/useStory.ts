/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoticiaAbierta } from './../interfaces/story';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { apiClient } from 'src/boot/axios';
import { cleanText, imgUrl, urlTitle } from 'src/shared/helpers/functions';
import useHistoryStore from 'src/stores/history';

import axios, { AxiosError } from 'axios';
import { useMeta } from 'quasar';
import { Ref } from 'vue';

interface Options {
  autoload?: boolean;
}

const getStory = async (id: number) => {
  if (id === 0 || id === null || isNaN(id))
    throw new Error('No existe la story con el id 0, null, NaN');

  try {
    const { data } = await apiClient.get<NoticiaAbierta>(`/noticias/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      const msg = JSON.stringify(err.response?.data.msg.errors[0].msg);
      throw new Error(msg);
    }
    throw new Error('Algo ha salido muy mal');
  }
};

const useStory = (id: Ref<number>, options?: Options) => {
  const { autoload = true } = options || {};

  const historyStore = useHistoryStore();

  const queryClient = useQueryClient();

  const preFetchStory = async (id: number) => {
    await queryClient.prefetchQuery(['story', id], () => getStory(id), {
      staleTime: 60 * 5_000,
    });

    const noticia = queryClient.getQueryData<NoticiaAbierta>(['story', id], {
      exact: true,
    });

    if (!noticia) return;
    historyStore.addNoticia(noticia);
  };

  const storyQuery = useQuery<NoticiaAbierta>(
    ['story', id],
    () => getStory(id.value),
    {
      // staleTime: 60 * 60_000,
      enabled: autoload && id.value !== 0 && !isNaN(id.value),
      initialData: () => historyStore.history[id.value],
      onSuccess(noticia) {
        if (!noticia) return;
        historyStore.addNoticia(noticia);
      },
    }
  );

  const { data: noticia } = storyQuery;

  if (autoload && id.value !== 0 && !isNaN(id.value) && noticia.value) {
    useMeta(() => {
      const home = `${process.env.BASE_URL}`;
      const url = home + urlTitle(noticia.value);
      const img = imgUrl(noticia.value.images?.thumb640 ?? '');
      const preloadImgHeader: any = {};

      preloadImgHeader[`perloadFeatureImage-${noticia.value.id}`] = {
        rel: 'preload',
        fetchpriority: 'high',
        as: 'image',
        href: img,
        type: 'image/webp',
      };

      return {
        title: noticia.value.title,
        link: preloadImgHeader,
        meta: {
          description: {
            name: 'description',
            content: cleanText(noticia.value.subtitle),
          },
          keywords: {
            name: 'keywords',
            content: noticia.value.tags.map((t) => t.name).join(','),
          },
          equiv: {
            'http-equiv': 'Content-Type',
            content: 'text/html; charset=UTF-8',
          },
          ogTitle: {
            property: 'og:title',
            content: cleanText(noticia.value.title),
          },

          ogDescription: {
            property: 'og:description',
            content: cleanText(noticia.value.subtitle),
          },
          ogUrl: {
            property: 'og:url',
            content: url,
          },
          ogImage: {
            property: 'og:image',
            content: img,
          },
          ogImageAlt: {
            property: 'og:image:alt',
            content: noticia.value.images?.name,
          },
          ogType: {
            property: 'og:type',
            content: 'website',
          },
          ogLocale: {
            property: 'og:locale',
            content: 'es_ES',
          },
        },
        twitter: {
          twDescription: {
            property: 'twitter:description',
            content: cleanText(noticia.value.subtitle),
          },
          twCountry: {
            property: 'twitter:app:country',
            content: cleanText('US'),
          },
          twCsp: {
            property: 'twitter:widgets:csp',
            content: cleanText('on'),
          },
          twPlay: {
            property: 'twitter:app:id:googleplay',
            content: cleanText('com.misiva.futbolecuadorpush'),
          },
          twIpad: {
            property: 'twitter:app:id:ipad',
            content: cleanText('1008177383'),
          },
          twIphone: {
            property: 'twitter:app:id:iphone',
            content: cleanText('1008177383'),
          },
          twCard: {
            property: 'twitter:card',
            content: cleanText('app'),
          },
        },
        script: {
          schema: {
            type: 'application/ld+json',
            innerHTML: `{
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${url}"
              },
              "headline": "${cleanText(noticia.value.title)}",
              "description": "${cleanText(noticia.value.subtitle)}",
              "image": "${img}",
              "author": {
                "@type": "Person",
                "name": "${noticia.value.author.nick}",
                "url": "${home}/${noticia.value.author.nick}"
              },
              "publisher": {
                "@type": "NewsMediaOrganization",
                "name": "futbolecuador.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${home}/icons/icon-512x512.png"
                }
              },
              "datePublished": "${noticia.value.created.split('T')[0]}"
            }`,
          },
        },
        noscript: {
          default: 'This is content for browsers with no JS (or disabled JS)',
        },
      };
    });
  }

  return {
    storyQuery,
    prefetchStory: preFetchStory,
  };
};

export default useStory;
