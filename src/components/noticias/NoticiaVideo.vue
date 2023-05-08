<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Noticia } from 'src/interfaces/stories';
import ImageContainer from 'src/shared/components/ImageContainer.vue';

const TitleNoticiaTileVideo = defineAsyncComponent(
  () => import('src/shared/components/TitleNoticiaTileVideo.vue')
);

const TitleNoticiaH4 = defineAsyncComponent(
  () => import('src/shared/components/TitleNoticiaH4.vue')
);

TitleNoticiaTileVideo;
TitleNoticiaH4;

interface Props {
  noticia: Noticia;
}

defineProps<Props>();
</script>

<template>
  <article>
    <router-link
      v-ripple:white
      :to="{
        name: 'noticiaAbiertaOld',
        params: {
          title: noticia.slug,
          id: noticia.id,
        },
      }"
      :title="noticia.title"
      class="column no-wrap q-pa-sm q-gutter-y-md relative-position"
    >
      <ImageContainer
        :key="noticia.id"
        :noticia="noticia"
        thumb="thumb300"
        height="130px"
      />
      <q-icon
        name="fa-solid fa-circle-play"
        color="white"
        size="md"
        class="absolute-left"
        style="top: 100px; left: 14px"
      />
      <TitleNoticiaH4 :title="noticia.title" dark />
    </router-link>
  </article>
</template>
<style lang="scss">
h3.text-bold.text-overflow-2.text-white {
  line-height: 1.2;
  margin: 0;
  font-size: 1.1rem;
}
</style>
