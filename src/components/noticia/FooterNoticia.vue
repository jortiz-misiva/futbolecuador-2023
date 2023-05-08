<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import useMediaQuery from '@/composables/useMediaQuery';
import useMasleidas from '@/composables/useMasleidas';

import AdComponent from '@/shared/components/ads/AdComponent.vue';
import VideoAdComponent from '@/shared/components/ads/VideoAdComponent.vue';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';

const NoticiaSecundaria = defineAsyncComponent(
  () => import('../noticias/NoticiaSecundaria.vue')
);
const FacebookComments = defineAsyncComponent(
  () => import('../noticia/FacebookComments.vue')
);
const TitleSection = defineAsyncComponent(
  () => import('@/shared/components/TitleSection.vue')
);

const { masleidasQuery } = useMasleidas();
const { isLoading, data: masleidas } = masleidasQuery;

const comentar = ref<boolean>(false);

const { isMobile } = useMediaQuery();

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <div class="column no-wrap q-gutter-y-sm q-mb-md">
    <section class="column no-wrap">
      <TitleSection title="Videos destacados" />
      <VideoAdComponent v-if="showComponent"
        video-id="eyJrZXkiOiIiLCJwIjoiZnV0Ym9sZWN1YWRvciIsInBsIjoia0VZQVFvZmwifQ==" />
      <AdComponent adid="div-gpt-ad-1677622873560-0" google-tag="/1022247/FutEc_Banner_Mobile2_Secciones" :arr-sizes="[
        [320, 50],
        [320, 100],
      ]" min-width="320" min-height="50" />

      <VideoAdComponent v-if="isMobile" source="fcp" video-id="MANUAL_2eb408cd-008a-44ef-b580-372c7ff2319d" />
    </section>
    <section class="column justify-center bg-white">
      <TitleSection title="Comentarios" />
      <q-btn v-if="!comentar" no-caps rounded outline color="primary" label="Comenta en esta noticia"
        style="width: 200px; margin: 24px auto" align="center" @click="comentar = true" />
    </section>
    <FacebookComments v-if="comentar" />
    <section v-if="!isLoading">
      <TitleSection title="Noticias más leídas" />
      <NoticiaSecundaria class="q-mb-sm" v-for="noticia in masleidas" :key="noticia.id" :noticia="noticia" />
    </section>
  </div>
</template>
