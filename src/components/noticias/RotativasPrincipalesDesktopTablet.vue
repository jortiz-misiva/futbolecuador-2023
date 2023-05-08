<script setup lang="ts">
import { defineAsyncComponent, toRef } from 'vue';
import { Noticia, Rotativas } from '@/interfaces/stories';
import TitleSection from '@/shared/components/TitleSection.vue';

interface Props {
  rotativas?: Rotativas;
  principales?: Noticia[];
}

const NoticiaPrincipal = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaPrincipal.vue')
);
const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);

const props = defineProps<Props>();

const rotativas = toRef(props, 'rotativas');
const principales = toRef(props, 'principales');
</script>

<template>
  <section class="gt-xs q-gutter-y-sm">
    <TitleSection v-if="rotativas?.editorial" title="Editorial" />
    <NoticiaPrincipal
      v-if="rotativas?.editorial"
      :noticia="rotativas.editorial"
      horizontal
    />
    <NoticiaPrincipal
      v-else-if="rotativas"
      :noticia="rotativas.noticias[8]"
      horizontal
    />
    <div>
      <div
        class="column no-wrap"
        v-for="(noticia, i) in principales?.slice(0, 6)"
        :key="noticia.id"
      >
        <NoticiaSecundaria
          :noticia="noticia"
          :image="i < 3 ? false : true"
          :class="{ 'q-my-xs': i > 3 }"
        />
        <q-separator
          v-if="i < 2"
          inset
          color="blue-grey-2"
          style="z-index: 1"
        />
      </div>
    </div>
  </section>
</template>
