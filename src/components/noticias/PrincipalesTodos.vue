<script setup lang="ts">
import { defineAsyncComponent, toRef } from 'vue';
import useMediaQuery from '@/composables/useMediaQuery';
import { Noticia } from '@/interfaces/stories';

const AdComponent = defineAsyncComponent(
  () => import('@/shared/components/ads/AdComponent.vue')
);

const SpotifyWidget = defineAsyncComponent(
  () => import('@/shared/components/spotify/SpotifyWidget.vue')
);
const NoticiaVideo = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaVideo.vue')
);
const NoticiaPrincipal = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaPrincipal.vue')
);
const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);
const TablaPosiciones = defineAsyncComponent(
  () => import('@/shared/components/tablas/TablaPosiciones.vue')
);
const TitleSection = defineAsyncComponent(
  () => import('@/shared/components/TitleSection.vue')
);

interface Props {
  principales?: Noticia[];
  videos?: Noticia[];
}

const { isDesktopOrTablet, isMobile } = useMediaQuery();
const props = defineProps<Props>();

const principales = toRef(props, 'principales');
const videos = toRef(props, 'videos');
</script>

<template>
  <section class="column no-wrap">
    <TitleSection title="Noticias recientes" />
    <NoticiaPrincipal
      v-if="principales"
      :noticia="principales[6]"
      :horizontal="isDesktopOrTablet"
    />
  </section>

  <section class="column no-wrap">
    <div
      class="column no-wrap"
      v-for="(noticia, i) in principales?.slice(7, 10)"
      :key="noticia.id"
    >
      <NoticiaSecundaria :noticia="noticia" :image="false" />
      <q-separator v-if="i < 2" inset color="blue-grey-2" style="z-index: 1" />
    </div>
  </section>

  <AdComponent
    v-if="isMobile"
    adid="div-gpt-ad-1667238975847-0"
    google-tag="/1022247/FutEc_Square-Mobile1_Home"
    :arr-sizes="[
      [300, 250],
      [300, 90],
      [320, 50],
      [320, 100],
      [300, 50],
    ]"
    min-width="300"
    min-height="50"
    view
  />

  <template v-if="isMobile">
    <!-- Tabla de posiciones -->
    <section class="column no-wrap">
      <TitleSection title="Tabla de posiciones" class="q-mt-sm" />
      <TablaPosiciones />
    </section>

    <AdComponent
      adid="div-gpt-ad-1657035533253-0"
      google-tag="/1022247/VideoWall_Mobile"
      :arr-sizes="[300, 600]"
      min-width="300"
      min-height="600"
      view
    />
  </template>
  <NoticiaSecundaria
    v-for="noticia in principales?.slice(10, 12)"
    :key="noticia.id"
    :noticia="noticia"
  />

  <section class="column no-wrap">
    <div
      class="column no-wrap"
      v-for="(noticia, i) in principales?.slice(12, 15)"
      :key="noticia.id"
    >
      <NoticiaSecundaria :noticia="noticia" :image="false" />
      <q-separator v-if="i < 2" inset color="blue-grey-2" style="z-index: 1" />
    </div>
  </section>

  <AdComponent
    v-if="isMobile"
    adid="div-gpt-ad-1667239070113-0"
    google-tag="/1022247/FutEc_Square-Mobile2_Home"
    :arr-sizes="[
      [320, 100],
      [320, 50],
      [300, 250],
    ]"
    min-height="300"
    min-width="50"
    view
  />

  <!-- Widget Spotify -->
  <SpotifyWidget v-if="isMobile" />

  <!-- Videos destacados -->
  <section class="column no-wrap">
    <TitleSection title="Videos destacados" />
    <div class="bg-primary q-px-sm q-py-md row">
      <NoticiaVideo
        class="col-6"
        v-for="noticia in videos"
        :noticia="noticia"
        :key="noticia.id"
      />
    </div>
  </section>

  <!-- Noticias principales -->
  <NoticiaPrincipal
    v-for="noticia in principales!.slice(15, 17)"
    :key="noticia.id"
    :noticia="noticia"
    :horizontal="isDesktopOrTablet"
    img-height="100%"
  />
  <AdComponent
    v-if="isMobile"
    adid="div-gpt-ad-1667239491797-0"
    google-tag="/1022247/FutEc_Square-Mobile3_Home"
    :arr-sizes="[
      [320, 100],
      [320, 50],
      [300, 250],
    ]"
    min-height="300"
    min-width="50"
    view
  />

  <NoticiaPrincipal
    v-for="noticia in principales!.slice(17, 20)"
    :key="noticia.id"
    :noticia="noticia"
    :horizontal="isDesktopOrTablet"
    img-height="100%"
  />

  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1667235687415-0"
    google-tag="/1022247/FutEc_Square_Home_3"
    :arr-sizes="[300, 250]"
    min-width="300"
    min-height="250"
    view
  />
  <AdComponent
    v-else
    adid="div-gpt-ad-1668717392974-0"
    google-tag="/1022247/FutEc_Square-Mobile4_Home"
    :arr-sizes="[
      [320, 100],
      [320, 50],
      [300, 250],
    ]"
    min-height="300"
    min-width="50"
    view
  />

  <NoticiaPrincipal
    v-for="noticia in principales!.slice(20, 23)"
    :key="noticia.id"
    :noticia="noticia"
    :horizontal="isDesktopOrTablet"
    img-height="100%"
  />

  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1667235781071-0"
    google-tag="/1022247/FutEc_Square_Home_4"
    :arr-sizes="[300, 250]"
    min-width="300"
    min-height="250"
    view
  />
  <AdComponent
    v-else
    adid="div-gpt-ad-1668550369352-0"
    google-tag="/1022247/FutEc_Square-Mobile5_Home"
    :arr-sizes="[
      [300, 250],
      [320, 50],
      [320, 100],
    ]"
    min-height="300"
    min-width="50"
    view
  />

  <NoticiaPrincipal
    v-for="noticia in principales!.slice(23, 26)"
    :key="noticia.id"
    :noticia="noticia"
    :horizontal="isDesktopOrTablet"
    img-height="100%"
  />

  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1667235871157-0"
    google-tag="/1022247/FutEc_Square_Home_5"
    :arr-sizes="[300, 250]"
    min-width="300"
    min-height="250"
    view
  />
  <AdComponent
    v-else
    adid="div-gpt-ad-1668550551998-0"
    google-tag="/1022247/FutEc_Square-Mobile6_Home"
    :arr-sizes="[
      [300, 250],
      [320, 50],
      [320, 100],
    ]"
    min-height="300"
    min-width="50"
    view
  />

  <NoticiaPrincipal
    v-for="noticia in principales!.slice(26, 29)"
    :key="noticia.id"
    :noticia="noticia"
    :horizontal="isDesktopOrTablet"
    img-height="100%"
  />

  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1667235931856-0"
    google-tag="/1022247/FutEc_Square_Home_6"
    :arr-sizes="[300, 250]"
    min-width="300"
    min-height="250"
    view
  />
  <AdComponent
    v-else
    adid="div-gpt-ad-1675443969592-0"
    google-tag="/1022247/FutEc_Square-Mobile7_Home"
    :arr-sizes="[
      [300, 250],
      [320, 50],
      [320, 100],
    ]"
    min-height="300"
    min-width="50"
    view
  />

  <NoticiaPrincipal
    v-for="noticia in principales!.slice(29)"
    :key="noticia.id"
    :noticia="noticia"
    :horizontal="isDesktopOrTablet"
    img-height="100%"
  />

  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1675443119285-0"
    google-tag="/1022247/FutEc_Square_Home_7"
    :arr-sizes="[300, 250]"
    min-width="300"
    min-height="250"
    view
  />
  <AdComponent
    v-else
    adid="div-gpt-ad-1675448371962-0"
    google-tag="/1022247/FutEc_Square-Mobile8_Home"
    :arr-sizes="[
      [320, 100],
      [300, 250],
      [320, 50],
    ]"
    min-width="300"
    min-height="50"
    view
  />
</template>
