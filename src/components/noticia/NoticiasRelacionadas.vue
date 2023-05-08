<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import useStories from 'src/composables/useStories';
import { urlTitle } from 'src/shared/helpers/functions';
import { useRoute } from 'vue-router';

const TitleNoticiaTile = defineAsyncComponent(
  () => import('src/shared/components/TitleNoticiaTile.vue')
);

interface Props {
  slugCategoria: string;
}
const props = defineProps<Props>();

const { principalesQuery } = useStories();
const { data: pricipales, isLoading } = principalesQuery;

const route = useRoute();

const relacionadas = computed(
  () =>
    pricipales.value?.filter(
      (noticia) =>
        noticia.category['slug-categoria'] === props.slugCategoria &&
        noticia.id !== +route.params.id
    ) ?? []
);
</script>

<template>
  <section
    class="column no-wrap q-py-sm bg-white q-my-sm"
    style="border-left: 3px solid"
    v-if="!isLoading && relacionadas.length"
  >
    <TitleNoticiaTile class="q-mx-md text-h6" title="Noticias relacionadas" />
    <TitleNoticiaTile
      v-ripple
      class="noticia-relacionada relative-position q-px-md q-py-sm cursor-pointer"
      v-for="noticia in relacionadas.slice(0, 3)"
      :key="noticia.id"
      :title="noticia.title"
      @click="$router.push(urlTitle(noticia))"
    />
  </section>
</template>

<style lang="scss" scoped>
.noticia-relacionada {
  transition: 0.2s;
}
.noticia-relacionada:hover {
  transition: 0.2s;
  background-color: rgba($color: $accent, $alpha: 0.1);
}
</style>
