<script setup lang="ts">
import { toRef, computed } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

import { Noticia } from '@/interfaces/stories';
import CustomSkeleton from '@/shared/components/CustomSkeleton.vue';
import NoticiaPrincipal from './NoticiaPrincipal.vue';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';

interface Props {
  rotativas?: Noticia[];
  height?: string;
}

const props = defineProps<Props>();

const rotativas = toRef(props, 'rotativas');

const slides = computed(() => {
  return {
    slide1: rotativas.value?.slice(0, 4) || [],
    slide2: rotativas.value?.slice(4, 8) || [],
  };
});

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <div class="relative-position inicio-carrusel">    
    <Carousel
      ref="carousel"
      v-if="rotativas"
      :autoplay="showComponent ? 9000 : undefined"
      pauseAutoplayOnHover
      wrapAround
      :style="{ height }"
      class="overflow-hidden"
    >
      <Slide v-for="(slideData, i) in slides" :key="i" class="slidexxx">
        <div class="text-left row no-wrap" :style="{ height }">
          <NoticiaPrincipal
            class="col-xs-7 col-lg-8 q-mr-sm"
            :noticia="slideData[0]"
            is-header
            eager-img
            :style="{
              height: height,
            }"
          />
          <div class="col column no-wrap q-gutter-y-sm">
            <NoticiaPrincipal
              v-for="(noticia, i) in slideData.slice(1)"
              :key="i"
              :noticia="noticia"
              class="col"
              img-height="100%"
              title-font-size="0.85rem"
              horizontal
              no-subtitle
              three-lines
            />
          </div>
        </div>
      </Slide>
    </Carousel>

    <CustomSkeleton
      v-else
      :style="{
        height,
      }"
    />
    <q-btn
      push
      dense
      color="primary"
      icon="arrow_left"
      class="nav-button absolute-left"
      style="left: -12px; height: 50px"
      @click="($refs.carousel as any).prev()"
    />

    <q-btn
      push
      dense
      color="primary"
      icon="arrow_right"
      class="nav-button absolute-right"
      style="right: -12px; height: 50px"
      @click="($refs.carousel as any).next()"
    />
  </div>
</template>

<style scoped lang="scss">
.nav-button {
  top: 50%;
  z-index: 1;
  opacity: 0.5;
  transition: 0.2s;
}

.nav-button:hover {
  opacity: 1;
  transition: 0.2s;
}
</style>
