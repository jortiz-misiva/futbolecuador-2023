<script setup lang="ts">
import { Noticia } from '@/interfaces/stories';
import { Category, Tag } from '@/interfaces/story';
import { urlTitle } from 'src/shared/helpers/functions';
import { defineAsyncComponent, toRefs } from 'vue';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  type: 'categoria' | 'tag' | 'noticias';
  image?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  image: true,
  separator: false,
});

const { type, data } = toRefs(props);

const url = (): string => {
  let url = '';
  if (type.value == 'noticias') {
    const noticia: Noticia = data.value;
    url = urlTitle(noticia);
  }
  if (type.value == 'categoria') {
    const categoria: Category = data.value;
    url = `/categoria/${categoria['slug-categoria']}`;
  }

  if (type.value == 'tag') {
    const tag: Tag = data.value;
    url = `/etiqueta/${tag.slug}`;
  }
  return url;
};

const name = (): string => {
  let name = '';
  if (type.value == 'noticias') {
    const noticia: Noticia = data.value;
    name = noticia.title;
  }
  if (type.value == 'categoria') {
    const categoria: Category = data.value;
    name = categoria.name;
  }

  if (type.value == 'tag') {
    const tag: Tag = data.value;
    name = tag.name;
  }
  return name;
};

const height = (): string => {
  let height = '80px';

  if (type.value == 'noticias') {
    height = '100px';
  }
  return height;
};
</script>

<template>
  <router-link
    v-ripple
    :to="url()"
    class="row no-wrap items-center relative-position bg-white"
  >
    <ImageContainer
      v-if="image && type == 'noticias'"
      class="col"
      :noticia="data"
      :height="height()"
      ratio="1"
      thumb="thumb300"
    />
    <div
      :class="{
        'col-8': image,
      }"
      class="column col no-wrap text-primary q-pa-sm q-gutter-y-xs justify-center"
      :style="{ height: height() }"
    >
      <TitleNoticiaTile :title="name()" class="text-body" font-size="0.9rem" />
      <div v-if="type != 'noticias'" class="text-subtitle">
        {{ type == 'categoria' ? 'Categoría' : 'Etiqueta' }}
      </div>
      <TimeHumanAuthor v-if="type == 'noticias'" :time="data.created" />
      <q-separator inset spaced />
    </div>
  </router-link>
</template>
