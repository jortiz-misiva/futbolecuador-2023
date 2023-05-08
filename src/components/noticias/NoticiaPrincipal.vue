<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { Noticia } from '@/interfaces/stories';
import { formatoNoticia } from '@/shared/helpers/functions';
import useMediaQuery from '@/composables/useMediaQuery';

import ImageContainer from '@/shared/components/ImageContainer.vue';

const TimeHumanAuthor = defineAsyncComponent(
  () => import('@/shared/components/TimeHumanAuthor.vue')
);
/*const TitleNoticiaTile = defineAsyncComponent(
  () => import('@/shared/components/TitleNoticiaTile.vue')
);*/

const TitleNoticiaH2 = defineAsyncComponent(
  () => import('@/shared/components/TitleNoticiaH2.vue')
);

interface Props {
  noticia: Noticia;
  eagerImg?: boolean;
  horizontal?: boolean;
  noSubtitle?: boolean;
  isHeader?: boolean;
  threeLines?: boolean;
  titleFontSize?: string;
  imgHeight?: string;
  imgThumb?: 'thumb300' | 'thumb640';
}

// const props =
withDefaults(defineProps<Props>(), {
  eagerImg: false,
  horizontal: false,
  noSubtitle: false,
  imgHeight: '100%',
  imgThumb: 'thumb640',
});

const { isDesktopOrTablet } = useMediaQuery();
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
    class="no-wrap relative-position bg-white overflow-hidden"
    :class="{ row: horizontal, column: !horizontal }"
    :style="{ height: isDesktopOrTablet ? '200px' : undefined }"
    :title="noticia.title"
  >
    <ImageContainer
      :key="noticia.id"
      class="col"
      :noticia="noticia"
      :eager-img="eagerImg"
      :thumb="horizontal ? 'thumb300' : imgThumb"
      :height="imgHeight"
    />
    <div
      :class="{
        'col-7': horizontal,
        'justify-center': horizontal,
      }"
      class="column no-wrap text-primary q-pa-md q-gutter-y-sm"
    >
      <TitleNoticiaH2
        :title="`${noticia.title} ${formatoNoticia[noticia.formato] ?? ''}`"
        :is-header="isHeader"
        :three-lines="threeLines"
        :font-size="titleFontSize"
      />
      <div v-if="!noSubtitle" class="text-subtitle text-overflow-2">
        {{ noticia.subtitle }}
      </div>
      <TimeHumanAuthor :time="noticia.created" :category="noticia.category" />
    </div>
  </router-link>
</template>
