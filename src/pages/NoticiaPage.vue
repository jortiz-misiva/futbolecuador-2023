<script lang="ts">
import {
  defineAsyncComponent,
  ref,
  onMounted,
  watch,
  onErrorCaptured,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import useDrawerStore from '@/stores/drawer';
import useHistoryStore from '@/stores/history';

import useMediaQuery from '@/composables/useMediaQuery';
import useStory from '@/composables/useStory';

import AdComponent from '@/shared/components/ads/AdComponent.vue';
import AdComponentPopup from '@/shared/components/ads/AdComponentPopup.vue';
import FutecPage from '@/shared/components/FutecPage.vue';
import FooterNoticia from '@/components/noticia/FooterNoticia.vue';
import TaboolaWidget from '@/shared/components/ads/TaboolaWidget.vue';
import BodyNoticia from '@/components/noticia/BodyNoticia.vue';

const DataFactoryIframeWidget = defineAsyncComponent(
  () => import('@/shared/components/datafactory/DataFactoryIframeWidget.vue')
);
const HeaderNoticia = defineAsyncComponent(
  () => import('@/components/noticia/HeaderNoticia.vue')
);
const SocialShare = defineAsyncComponent(
  () => import('@/components/noticia/SocialShare.vue')
);
const SpinnerDots = defineAsyncComponent(
  () => import('@/shared/components/SpinnerDots.vue')
);

export default {
  preFetch: async ({ currentRoute: route, store, redirect }) => {
    if (
      route.name?.toString().includes('noticiaAbierta') &&
      route.params.id &&
      isNaN(+route.params.id)
    ) {
      redirect('/');
      return;
    }

    const { preFetchNoticia, history } = useHistoryStore(store);

    if (!history[+route.params.id]) {
      const drawer = useDrawerStore();
      drawer.isPrefech = true;
      const noticia = await preFetchNoticia(+route.params.id);
      drawer.isPrefech = false;
      if (!noticia) redirect('/');
    }
  },
  components: {
    HeaderNoticia,
    SocialShare,
    SpinnerDots,
    FutecPage,
    FooterNoticia,
    BodyNoticia,
    TaboolaWidget,
    AdComponent,
    DataFactoryIframeWidget,
  },
};
</script>

<script setup lang="ts">
const { isDesktopOrTablet, isMobile } = useMediaQuery();
const route = useRoute();
const router = useRouter();

const id = ref<number>(+route.params.id);
const { storyQuery } = useStory(id);
const { data: noticia, isLoading, isError } = storyQuery;

onErrorCaptured((debug) => {
  console.log('Algo salido mal renderizando:', noticia.value.id, { debug });
});

watch(route, () => {
  if (
    route.name?.toString().includes('noticiaAbierta') &&
    isNaN(+route.params.id)
  ) {
    router.replace('/');
    return;
  } else if (route.name?.toString().includes('noticiaAbierta')) {
    id.value = +route.params.id;
  }
});

watch(isError, () => {
  if (!isLoading.value && isError.value) {
    router.replace('/');
  }
});

onMounted(() => {
  if (
    route.name?.toString().includes('noticiaAbierta') &&
    isNaN(+route.params.id)
  )
    router.replace('/');
});
</script>

<template>
  <div id="fb-root"></div>
  <FutecPage>
    <template v-slot:header>
      <DataFactoryIframeWidget
        v-if="isMobile"
        id="agenda-mam-mobile"
        src="htmlCenter/data/deportes/futbol/todos/pages/es/agenda_ticker.html"
        custom-height="150px"
        min-height="150px"
        scrolling="no"
        class="q-pl-sm"
        :auto-resize="false"
      />
      <DataFactoryIframeWidget
        v-else
        id="agenda-mam-desktop"
        src="htmlCenter/data/deportes/futbol/todos/pages/es/agenda_ticker.html"
        custom-height="100px"
        min-height="100px"
        scrolling="no"
        class="q-pl-sm"
        :auto-resize="false"
      />
      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1675196068572-0"
        google-tag="/1022247/FutEc_Leaderboard_Secciones"
        :arr-sizes="[
          [728, 90],
          [970, 90],
        ]"
        min-width="728"
        min-height="90"
        class="q-pb-sm"
      />
    </template>

    <article v-if="!isLoading && noticia">
      <HeaderNoticia v-if="noticia" :noticia="noticia" />

      <AdComponent
        v-if="isMobile"
        adid="div-gpt-ad-1659048379970-0"
        google-tag="/1022247/FutEc_Top_Mobile_Secciones"
        :arr-sizes="[320, 100]"
        min-width="320"
        min-height="100"
      />

      <BodyNoticia v-if="noticia" :noticia="noticia" />

      <!-- Autor -->
      <section
        v-if="noticia"
        class="column no-wrap q-pa-md bg-white"
        v-show="noticia.author.nick"
      >
        <div class="text-bold q-pb-sm">Autor:</div>
        <div class="row q-gutter-sm">
          <q-btn
            icon="fa-solid fa-user"
            padding="0 8px"
            dense
            no-caps
            rounded
            unelevated
            class="text-blue-grey-10"
            color="blue-grey-1"
            :label="noticia.author.nick"
            :to="{ name: 'author', params: { nick: noticia.author.nick } }"
          />
          <q-btn
            icon="fa-brands fa-twitter"
            padding="0 8px"
            dense
            no-caps
            rounded
            unelevated
            class="text-blue-grey-10"
            color="blue-grey-1"
            :label="noticia.author.twitter"
            :href="`https://twitter.com/${noticia.author.twitter}`"
            target="__blank"
          />
          <q-btn
            icon="fa-solid fa-envelope"
            padding="0 8px"
            dense
            no-caps
            rounded
            unelevated
            class="text-blue-grey-10"
            color="blue-grey-1"
            :label="noticia.author.nick?.concat('@futbolecuador.com')"
            :href="`mailto:${noticia.author.nick?.concat(
              '@futbolecuador.com'
            )}`"
          />
        </div>
      </section>

      <AdComponent
        class="q-pt-xs"
        v-if="isMobile"
        adid="div-gpt-ad-1666391387960-0"
        google-tag="/1022247/BoxBanner_Mobile_Secciones"
        :arr-sizes="[
          [320, 50],
          [320, 100],
          [300, 50],
          [300, 250],
        ]"
        min-height="50"
        min-width="300"
      />

      <!-- Etiquetas -->
      <section v-if="noticia" class="column no-wrap q-pa-md bg-white">
        <div class="text-bold q-pb-sm">Etiquetas:</div>
        <div class="row q-gutter-sm">
          <q-btn
            v-for="label in noticia.tags"
            :key="label.slug"
            padding="0 14px"
            dense
            no-caps
            rounded
            unelevated
            class="text-blue-grey-10"
            color="blue-grey-1"
            :label="label.name"
            :to="{ name: 'tag', params: { term: label.slug } }"
          />
        </div>
      </section>
      <SocialShare class="bg-white q-py-lg" />

      <FooterNoticia />
    </article>
    <SpinnerDots v-else />
    <TaboolaWidget
      class="q-pa-sm rounded-borders bg-white"
      tid="taboola-below-article-thumbnails"
      placement="Below Article Thumbnails"
      :mode="isMobile ? 'thumbnails-a' : 'thumbnails-b'"
    />
    <template v-slot:footer>
      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1675197002357-0"
        google-tag="/1022247/FutEc_Billboard_Desktop_Secciones"
        :arr-sizes="[
          [970, 250],
          [970, 90],
          [728, 90],
        ]"
        min-width="728"
        min-height="90"
      />
    </template>
  </FutecPage>

  <!-- Vidoomy_FE -->
  <AdComponent
    v-if="isMobile && $route.name?.toString().includes('noticiaAbierta')"
    adid="div-gpt-ad-1667238529783-0"
    google-tag="/1022247/Vidoomy_FE"
    :arr-sizes="[1, 1]"
    min-width="1"
    min-height="1"
    can-show
  />

  <!-- Pops publicitarios secciones-->

  <AdComponentPopup
    v-if="isDesktopOrTablet"
    desktop-or-tablet
    adid="div-gpt-ad-1667237284533-0"
    google-tag="/1022247/FutEc_SplashDesktop_Secciones"
    :arr-sizes="[800, 600]"
    min-width="800"
    min-height="600"
  />
  <AdComponentPopup
    v-else
    adid="div-gpt-ad-1667238145689-0"
    google-tag="/1022247/FutEc_SplashMobile_Secciones"
    :arr-sizes="[320, 480]"
    min-width="320"
    min-height="480"
  />

  <!-- banner 1x1 -->
  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1680552978200-0"
    google-tag="/1022247/Skin_Desktop_Secciones_1x1"
    :arr-sizes="[1, 1]"
    min-width="1"
    min-height="1"
  />
</template>

<style lang="scss">
.column > .row > .q-btn .q-icon {
  font-size: inherit !important;
}
</style>
