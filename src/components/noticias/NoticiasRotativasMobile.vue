<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { Noticia, Rotativas } from '@/interfaces/stories';
import { QBtnToggleProps } from 'quasar';
import { toRef, defineAsyncComponent, ref, computed } from 'vue';
import NoticiaPrincipal from './NoticiaPrincipal.vue';
import TitleSection from '@/shared/components/TitleSection.vue';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import AdComponent from '@/shared/components/ads/AdComponent.vue';

const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);

interface Props {
  rotativas: Rotativas;
  principales?: Noticia[];
}

const props = defineProps<Props>();

const rotativas = toRef(props, 'rotativas');
const principales = toRef(props, 'principales');

const slide = ref<number>(0);

const options = computed<QBtnToggleProps['options']>(
  () =>
    rotativas.value.noticias?.map((x, i) => {
      return {
        value: i,
        slot: slide.value == i ? 'iconActive' : 'icon',
      };
    }) || []
);

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <Carousel
    v-model="slide"
    style="min-height: 400px"
    :autoplay="showComponent ? 9000 : undefined"
    pauseAutoplayOnHover
    wrapAround
  >
    <Slide
      v-for="noticia in rotativas.noticias"
      :key="noticia.id"
      class="text-left"
    >
      <NoticiaPrincipal class="fit" :noticia="noticia" />
    </Slide>
  </Carousel>

  <div class="row justify-center">
    <q-btn-toggle v-model="slide" :options="options" flat dense>
      <template v-slot:icon>
        <q-icon
          name="circle"
          color="accent"
          size="1.2rem"
          style="opacity: 0.2"
        />
      </template>
      <template v-slot:iconActive>
        <q-icon name="circle" size="1.2rem" />
      </template>
    </q-btn-toggle>
  </div>

  <div class="column">
    <AdComponent
      adid="div-gpt-ad-1681925253945-0"
      google-tag="/1022247/FutEc_Boton_Mobile"
      :arr-sizes="[320, 50]"
      min-width="320"
      min-height="50"
    />
    <template v-if="rotativas.editorial">
      <TitleSection title="Editorial" />
      <NoticiaSecundaria class="q-mb-sm" :noticia="rotativas.editorial" />
    </template>

    <div
      class="column no-wrap"
      v-for="(noticia, i) in principales?.slice(0, 3)"
      :key="noticia.id"
    >
      <NoticiaSecundaria :noticia="noticia" :image="false" />
      <q-separator v-if="i < 2" inset color="blue-grey-2" style="z-index: 1" />
    </div>
  </div>
</template>

<style lang="scss">
.carousel__track {
  touch-action: auto;
}
</style>
