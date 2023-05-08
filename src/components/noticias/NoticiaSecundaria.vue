<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Noticia } from '@/interfaces/stories';
import { formatoNoticia } from '@/shared/helpers/functions';

import ImageContainer from '@/shared/components/ImageContainer.vue';

const TimeHumanAuthor = defineAsyncComponent(
  () => import('@/shared/components/TimeHumanAuthor.vue')
);
/*const TitleNoticiaTile = defineAsyncComponent(
  () => import('@/shared/components/TitleNoticiaTile.vue')
);*/

const TitleNoticiaH3 = defineAsyncComponent(
  () => import('@/shared/components/TitleNoticiaH3.vue')
);

interface Props {
  noticia: Noticia;
  image?: boolean;
}

withDefaults(defineProps<Props>(), {
  image: true,
  separator: false,
});
</script>

<template>
  <router-link
    v-ripple
    :to="{
      name: 'noticiaAbiertaOld',
      params: {
        title: noticia.slug,
        id: noticia.id,
      },
    }"
    :title="noticia.title"
    class="row no-wrap items-center relative-position bg-white overflow-hidden"
  >
    <ImageContainer
      :key="noticia.id"
      v-show="image"
      class="col"
      :noticia="noticia"
      height="120px"
      thumb="thumb300"
    />
    <div
      :class="{
        'col-8': image,
      }"
      class="column no-wrap text-primary q-pa-md q-gutter-y-sm justify-center"
      style="height: 120px"
    >
      <TitleNoticiaH3
        :title="`${noticia.title} ${formatoNoticia[noticia.formato] ?? ''}`"
      />
      <TimeHumanAuthor :time="noticia.created" :category="noticia.category" />
    </div>
  </router-link>
</template>
