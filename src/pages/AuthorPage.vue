<script setup lang="ts">
import useAuthor from '@/composables/useAuthor';
import SpinnerDots from '@/shared/components/SpinnerDots.vue';
import FutecPage from '@/shared/components/FutecPage.vue';
import AdComponent from '@/shared/components/ads/AdComponent.vue';
import AdComponentPopup from '@/shared/components/ads/AdComponentPopup.vue';

const NoticiaPrincipal = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaPrincipal.vue')
);

const TitleSection = defineAsyncComponent(
  () => import('@/shared/components/TitleSection.vue')
);

const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);

const route = useRoute();
const nick = computed(() => route.params.nick?.toString() ?? '');

const { authorQuery } = useAuthor(nick);
const { data: authorData, fetchNextPage, hasNextPage, isLoading } = authorQuery;

const infinity = computed(() =>
  authorData.value?.pages.map((resp) => resp.noticias).flat(1)
);

const author = computed(() => authorData.value?.pages[0].autor);

const onLoad = async (
  index: number,
  done: (stop?: boolean | undefined) => void
) => {
  if (!hasNextPage?.value) return done(true);
  await fetchNextPage();
  done();
};

useMeta(() => {
  return {
    title: `Autor: ${author.value?.nick ?? 'No encontrado'}`,
  };
});

const { isDesktopOrTablet, isMobile } = useMediaQuery();
</script>

<template>
  <FutecPage>
    <template v-slot:header>
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
      />
    </template>
    <!-- Noticias del author infinitas -->
    <q-infinite-scroll
      v-if="!isLoading"
      @load="onLoad"
      :offset="1500"
      class="q-gutter-y-sm"
    >
      <AdComponent
        v-if="isMobile"
        class="q-pt-sm"
        adid="div-gpt-ad-1659048379970-0"
        google-tag="/1022247/FutEc_Top_Mobile_Secciones"
        :arr-sizes="[320, 100]"
        min-width="320"
        min-height="100"
      />

      <TitleSection :title="author?.nick ?? 'No encontrado'" class="q-mt-sm" />
      <section class="column q-gutter-y-sm">
        <NoticiaPrincipal
          v-if="infinity && infinity[0]"
          :noticia="infinity[0]"
          :horizontal="isDesktopOrTablet"
        />

        <div class="column">
          <div
            class="column no-wrap"
            v-for="(noticia, i) in infinity?.slice(1, 4)"
            :key="noticia.id"
          >
            <NoticiaSecundaria :noticia="noticia" :image="false" />
            <q-separator
              v-if="i < 2"
              inset
              color="blue-grey-2"
              style="z-index: 1"
            />
          </div>
        </div>

        <NoticiaSecundaria
          v-for="noticia in infinity?.slice(4, 7)"
          :key="noticia.id"
          :noticia="noticia"
        />
      </section>

      <AdComponent
        class="q-pt-sm"
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

      <section class="column q-gutter-y-sm">
        <NoticiaPrincipal
          v-if="infinity && infinity[7]"
          :noticia="infinity[7]"
          :horizontal="isDesktopOrTablet"
        />

        <div class="column">
          <div
            class="column no-wrap"
            v-for="(noticia, i) in infinity?.slice(8, 11)"
            :key="noticia.id"
          >
            <NoticiaSecundaria :noticia="noticia" :image="false" />
            <q-separator
              v-if="i < 2"
              inset
              color="blue-grey-2"
              style="z-index: 1"
            />
          </div>
        </div>
      </section>

      <NoticiaSecundaria
        class="q-mb-sm"
        v-for="noticia in infinity?.slice(11, 14)"
        :key="noticia.id"
        :noticia="noticia"
      />

      <section class="column">
        <div
          class="column no-wrap"
          v-for="(noticia, i) in infinity?.slice(14, 17)"
          :key="noticia.id"
        >
          <NoticiaSecundaria :noticia="noticia" :image="false" />
          <q-separator
            v-if="i < 2"
            inset
            color="blue-grey-2"
            style="z-index: 1"
          />
        </div>
      </section>

      <section class="column q-gutter-y-sm">
        <NoticiaPrincipal
          v-for="noticia in infinity?.slice(17)"
          :key="noticia.id"
          :noticia="noticia"
          :horizontal="isDesktopOrTablet"
        />
      </section>

      <template v-slot:loading>
        <SpinnerDots />
      </template>
    </q-infinite-scroll>

    <template v-else>
      <SpinnerDots />
    </template>

    <!-- Pops publicitarios secciones-->
    <AdComponentPopup
      v-if="isDesktopOrTablet"
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
  </FutecPage>
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

<script lang="ts">
import useStoriesStore from 'src/stores/stories';
import { useRoute } from 'vue-router';
import useMediaQuery from '@/composables/useMediaQuery';
import { useMeta } from 'quasar';
import { defineAsyncComponent, computed } from 'vue';

export default {
  preFetch: async ({ currentRoute: route, store, redirect }) => {
    const { params } = route;
    const { preFetchAuthor } = useStoriesStore(store);
    const resp = await preFetchAuthor(params.nick.toString());
    if (!resp || resp.total == 0) redirect('/');
  },
};
</script>
