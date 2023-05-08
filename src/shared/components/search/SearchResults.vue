<script setup lang="ts">
import useSearch from '@/composables/useSearch';
import { defineAsyncComponent, toRef, ref, computed, watch } from 'vue';
const SearchItem = defineAsyncComponent(
  () => import('@/shared/components/search/SearchItem.vue')
);
const SpinnerDots = defineAsyncComponent(() => import('../SpinnerDots.vue'));

interface Props {
  searchTerm: string | null;
}

interface Emits {
  (event: 'isLoading', isLoading: boolean): void;
  (event: 'onTypeChange', oldVal: string, newVal: string): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const searchTerm = toRef(props, 'searchTerm');
const type = ref<'tag' | 'categoria' | 'noticias'>('noticias');

const { searchQuery } = useSearch(searchTerm, type);
const { data: result, isLoading, fetchNextPage, hasNextPage } = searchQuery;

const results = computed(() =>
  result.value?.pages.map((x) => x.resultados).flat(1)
);

watch(isLoading, () => {
  emits('isLoading', isLoading.value);
});

watch(type, (newVal, oldVal) => {
  emits('onTypeChange', oldVal, newVal);
});

const onLoad = async (
  index: number,
  done: (stop?: boolean | undefined) => void
) => {
  if (!hasNextPage?.value) return done(true);
  await fetchNextPage();
  done();
};

const changeType = (value: 'tag' | 'categoria' | 'noticias') => {
  type.value = value;
};
</script>
<template>
  <div class="bg-white rounded-borders">
    <div class="row no-wrap text-primary q-pa-sm q-gutter-xs">
      <q-btn
        class="col"
        padding="4px 8px"
        unelevated
        no-caps
        rounded
        :outline="type != 'noticias'"
        color="accent"
        label="Noticias"
        @click="changeType('noticias')"
      />
      <q-btn
        class="col"
        padding="4px 8px"
        unelevated
        no-caps
        rounded
        :outline="type != 'categoria'"
        color="accent"
        label="Categorías"
        @click="changeType('categoria')"
      />

      <q-btn
        class="col"
        padding="4px 8px"
        unelevated
        no-caps
        rounded
        :outline="type != 'tag'"
        color="accent"
        label="Etiquetas"
        @click="changeType('tag')"
      />
    </div>

    <q-scroll-area
      class="rounded-borders"
      :style="{ height: isLoading || !results?.length ? '80px' : '60vh' }"
    >
      <q-infinite-scroll
        v-if="!isLoading"
        class="column no-wrap"
        @load="onLoad"
        :offset="500"
      >
        <template v-if="!results?.length">
          <div class="text-primary absolute-center text-no-wrap">
            No existen resultados
          </div>
        </template>
        <template v-if="type == 'noticias'">
          <SearchItem
            v-for="noticia in results"
            :key="noticia.id"
            :data="noticia"
            type="noticias"
            :image="false"
          />
        </template>

        <template v-else-if="type == 'categoria'">
          <SearchItem
            v-for="noticia in results"
            :key="noticia.id"
            :data="noticia"
            type="categoria"
            :image="false"
          />
        </template>

        <template v-else-if="type == 'tag'">
          <SearchItem
            v-for="noticia in results"
            :key="noticia.id"
            :data="noticia"
            type="tag"
            :image="false"
          />
        </template>
      </q-infinite-scroll>
      <SpinnerDots v-else />
    </q-scroll-area>
  </div>
</template>
