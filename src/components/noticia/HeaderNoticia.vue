<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import useMediaQuery from '@/composables/useMediaQuery';
import { NoticiaAbierta } from 'src/interfaces/story';
import ScriptTag from '@/shared/components/ScriptTag.vue';
import { formatoNoticia } from '@/shared/helpers/functions';

const ImageContainer = defineAsyncComponent(
  () => import('src/shared/components/ImageContainer.vue')
);
const TimeHumanAuthor = defineAsyncComponent(
  () => import('src/shared/components/TimeHumanAuthor.vue')
);
const TitleNoticiaTile = defineAsyncComponent(
  () => import('src/shared/components/TitleNoticiaTile.vue')
);

interface Props {
  noticia: NoticiaAbierta;
}

defineProps<Props>();

const { isDesktopOrTabletLandscape } = useMediaQuery();
</script>

<template>
  <section class="bg-white">
    <div class="column no-wrap q-px-md q-py-md q-gutter-y-sm">
      <TimeHumanAuthor :category="noticia.category" :time="noticia.created" />
      <TitleNoticiaTile
        :title="`${noticia.title} ${formatoNoticia[noticia.formato] ?? ''}`"
        :is-header="true"
      />
    </div>
    <ImageContainer
      :key="noticia.id"
      :noticia="noticia"
      thumb="thumb640"
      :height="isDesktopOrTabletLandscape ? '400px' : undefined"
    >
      <!-- seedtag -->
      <ScriptTag
        async
        src="https://t.seedtag.com/t/2736-3943-01.js"
      ></ScriptTag>
    </ImageContainer>
    <h2
      class="text-subtitle q-pa-md"
      style="font-size: 20px; line-height: 1.5"
      v-html="noticia.subtitle"
    ></h2>
  </section>
</template>
