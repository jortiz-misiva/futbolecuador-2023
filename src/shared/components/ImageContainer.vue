<script setup lang="ts">
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import { Noticia } from 'src/interfaces/stories';
import { NoticiaAbierta } from 'src/interfaces/story';
import { imgUrl } from 'src/shared/helpers/functions';

interface Props {
  noticia: Noticia | NoticiaAbierta;
  width?: string;
  height?: string;
  thumb?: 'thumb300' | 'thumb640';
  eagerImg?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  height: '250px',
  width: '100%',
  thumb: 'thumb640',
});

const src = imgUrl(
  props.noticia.images
    ? props.noticia.images[props.thumb]
    : '~assets/no-img.webp'
);

const srcLowRes = imgUrl(
  props.noticia.images
    ? props.noticia.images['thumb300']
    : '~assets/no-img.webp'
);
</script>

<template>
  <div>
    <img
      v-if="!noticia.images?.name"
      src="/no-img.webp"
      class="fallback-image"
      alt="no image"
      :style="{
        width,
        height,
      }"
    />

    <img
      v-else
      :src="srcLowRes"
      class="lazyload"
      :alt="noticia.images?.name ?? 'no image'"
      :style="{
        width,
        height,
      }"
      :data-src="src"
      onerror="this.style.display='none';this.parentElement.querySelector('#no-image').style.display = 'block'"
      style="object-fit: cover; object-position: top"
    />
    <slot></slot>
    <img
      id="no-image"
      src="/no-img.webp"
      class="fallback-image"
      alt="no image"
      :style="{
        width,
        height,
      }"
      style="display: none"
    />
  </div>
</template>

<style scoped lang="scss">
.fallback-image {
  object-fit: contain;
  padding: 2rem;
  opacity: 0.5;
  background-image: white;
}
</style>
