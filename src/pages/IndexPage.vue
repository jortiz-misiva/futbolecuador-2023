<script lang="ts">
import useStoriesStore from '../stores/stories';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import useHistoryStore from '@/stores/history';
import { imgUrl } from '@/shared/helpers/functions';

export default {
  preFetch: async ({ store }) => {
    const { preFetchNoticias, rotativas } = useStoriesStore(store);
    const {
      // preFetchCalendario,
      // preFetchTorneos,
      torneos,
      scoreboards,
      calendarios,
      // preFetchScoreboard,
    } = useHistoryStore();

    if (
      !rotativas ||
      !torneos.length ||
      !Object.keys(scoreboards).length ||
      !Object.keys(calendarios).length
    )
      await Promise.all([
        preFetchNoticias(),
        // preFetchCalendario('359', undefined, '94'),
        // preFetchTorneos(),
        // preFetchScoreboard(94, 359),
      ]);
  },
};
</script>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { defineAsyncComponent, onErrorCaptured } from 'vue';
import { indexMetaData } from '@/shared/helpers/constants';
import FutecPage from '@/shared/components/FutecPage.vue';

import useMediaQuery from '@/composables/useMediaQuery';
import useStories from '@/composables/useStories';

import NoticiasRotativas from '@/components/noticias/NoticiasRotativasSlider.vue';
import NoticiasRotativasMobile from '@/components/noticias/NoticiasRotativasMobile.vue';
import AdComponentPopup from '@/shared/components/ads/AdComponentPopup.vue';
import AdComponent from '@/shared/components/ads/AdComponent.vue';

const DataFactoryIframeWidget = defineAsyncComponent(
  () => import('@/shared/components/datafactory/DataFactoryIframeWidget.vue')
);
const TitleSection = defineAsyncComponent(
  () => import('@/shared/components/TitleSection.vue')
);
const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);
const RotativasPrincipalesDesktopTablet = defineAsyncComponent(
  () => import('@/components/noticias/RotativasPrincipalesDesktopTablet.vue')
);
const PrincipalesTodos = defineAsyncComponent(
  () => import('@/components/noticias/PrincipalesTodos.vue')
);

const { principalesQuery, rotativasQuery, videosQuery } = useStories();

const { data: principales } = principalesQuery;
const { data: rotativas } = rotativasQuery;
const { data: videos } = videosQuery;

const { isDesktopOrTablet, isMobile } = useMediaQuery();

let imagesToPreload: {
  [key: string]: {
    rel: string;
    fetchpriority: string;
    as: string;
    href: string;
    type: string;
  };
} = {};

const preloadImages = () => {
  rotativas.value?.noticias.forEach((x) => {
    imagesToPreload[`image-${x.id}`] = {
      rel: 'preload',
      fetchpriority: 'high',
      as: 'image',
      href: imgUrl(rotativas.value?.noticias[0].images?.thumb640) ?? '',
      type: 'image/webp',
    };
  });

  if (rotativas.value?.editorial) {
    imagesToPreload['editorial'] = {
      rel: 'preload',
      fetchpriority: 'high',
      as: 'image',
      href: imgUrl(rotativas.value?.editorial.images?.thumb300) ?? '',
      type: 'image/webp',
    };
  }
};

preloadImages();

useMeta({
  ...indexMetaData,
  link: imagesToPreload,
});

onErrorCaptured((debug) => {
  console.log('Algo salido mal renderizando el home:', { debug });
});

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <!-- banner 1x1 -->
  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1680552682203-0"
    google-tag="/1022247/Skin_Desktop_Home_1x1"
    :arr-sizes="[1, 1]"
    min-width="1"
    min-height="1"
  />

  <h1 class="titlar-home">
    Lo mejor del fútbol ecuatoriano:Noticias, Partidos, Mundial, Liga Pro
  </h1>

  <FutecPage>
    <template v-slot:header>
      <NoticiasRotativas
        class="col-12 gt-xs"
        height="600px"
        v-show="isDesktopOrTablet"
        :rotativas="rotativas?.noticias"
      />

      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1678469226218-0"
        google-tag="/1022247/FutEc_Leaderboard_Home"
        :arr-sizes="[
          [728, 90],
          [970, 90],
        ]"
        min-width="728"
        min-height="90"
      />
    </template>

    <!-- rotativas mobile -->
    <section class="lt-sm q-gutter-y-sm" v-if="isMobile">
      <AdComponent
        adid="div-gpt-ad-1656975041270-0"
        google-tag="/1022247/FutEc_Top_Mobile_Home"
        :arr-sizes="[320, 100]"
        min-width="320"
        min-height="100"
        force
      />

      <NoticiasRotativasMobile
        v-if="rotativas"
        :principales="principales"
        :rotativas="rotativas"
      />

      <TitleSection
        v-if="showComponent"
        title="Marcador en vivo"
        class="q-mt-sm"
      />
      <DataFactoryIframeWidget
        :auto-resize="false"
        id="agenda-mam-mobile"
        src="htmlCenter/data/deportes/futbol/todos/pages/es/agenda_ticker.html"
        scrolling="no"
        custom-height="150px"
        min-height="150px"
      />

      <NoticiaSecundaria
        v-for="noticia in principales?.slice(3, 6)"
        :key="noticia.id"
        :noticia="noticia"
      />

      <AdComponent
        adid="div-gpt-ad-1657034743372-0"
        google-tag="/1022247/FutEc_Mid_Mobile_Home"
        :arr-sizes="[
          [320, 100],
          [300, 250],
        ]"
        min-width="300"
        min-height="100"
        view
      />
    </section>

    <!-- rotativas desktop/tablet -->
    <RotativasPrincipalesDesktopTablet
      v-if="isDesktopOrTablet"
      :principales="principales"
      :rotativas="rotativas"
    />

    <!-- Principales -->
    <PrincipalesTodos
      v-if="showComponent"
      :principales="principales"
      :videos="videos"
    />

    <template v-slot:footer>
      <!-- Estadisticas -->
      <DataFactoryIframeWidget
        id="estadisticas-home"
        src="minapp/modules/futbol/tournamentStats/tournamentStats.html?channel=deportes.futbol.ecuador.tournamentStats&lang=es_LA"
        scrolling="auto"
        min-height="990px"
      />

      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1668460148304-0"
        google-tag="/1022247/FutEc_Billboard_Desktop_Home"
        :arr-sizes="[
          [970, 90],
          [970, 250],
          [728, 90],
        ]"
        min-width="728"
        min-height="90"
        view
      />
    </template>
  </FutecPage>
  <!-- Pops publicitarios home -->

  <AdComponentPopup
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1667234651519-0"
    google-tag="/1022247/FutEc_Splash-Desktop_Home"
    :arr-sizes="[800, 600]"
    min-width="800"
    min-height="600"
  />
  <AdComponentPopup
    v-else
    adid="div-gpt-ad-1668717769565-0"
    google-tag="/1022247/FutEc_Splash-Movil_Home"
    :arr-sizes="[320, 480]"
    min-width="320"
    min-height="480"
  />
</template>
<style lang="scss">
.titlar-home {
  display: none;
}
</style>
