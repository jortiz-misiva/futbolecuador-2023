<script setup lang="ts">
import useDrawerStore from '@/stores/drawer';
import { debounce } from 'quasar';
import { defineAsyncComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

const SearchResults = defineAsyncComponent(() => import('./SearchResults.vue'));

interface Props {
  dark?: boolean;
  fixedTop?: boolean;
}

interface Emits {
  (e: 'onEnter'): void;
}

withDefaults(defineProps<Props>(), { dark: true, fixedTop: true });
const emits = defineEmits<Emits>();

const searchInput = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const isFocus = ref<boolean>(false);
const input = ref<HTMLInputElement>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deb: any;

const router = useRouter();
const drawerStore = useDrawerStore();

const setIsLoading = (loading: boolean) => (isLoading.value = loading);

const onTypeChange = () => {
  if (deb) deb.cancel();
  input.value?.focus();
};

const focus = (focusing: boolean) => {
  if (deb) deb.cancel();
  if (focusing) return (isFocus.value = focusing);
  deb = debounce(function () {
    isFocus.value = focusing;
  }, 200);
  deb();
};

const onEnter = () => {
  if (!(searchInput.value && searchInput.value?.length >= 3)) return;
  emits('onEnter');
  drawerStore.leftDrawerOpen = false;
  router.push({
    name: 'search',
    params: { term: searchInput.value },
  });
};
</script>

<template>
  <div class="full-width q-my-sm relative-position">
    <q-input
      ref="input"
      :clearable="dark"
      dense
      :autofocus="!dark"
      rounded
      v-model.trim="searchInput"
      label="Buscar..."
      debounce="500"
      :standout="dark ? true : 'bg-blue-grey-1 text-primary no-shadow'"
      :loading="isLoading"
      :dark="dark"
      @focus="focus(true)"
      @blur="focus(false)"
      type="search"
      :input-class="dark ? undefined : 'text-primary'"
      v-on:keyup.enter="onEnter"
    >
      <template v-slot:prepend>
        <q-icon name="search" :color="dark ? undefined : 'blue-grey-6'" />
      </template>
      <template v-if="searchInput && !dark" v-slot:append>
        <q-icon
          color="blue-grey-5"
          name="cancel"
          @click.stop.prevent="searchInput = null"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <SearchResults
      v-if="isFocus && searchInput && searchInput?.length >= 3"
      style="top: 60px"
      :class="fixedTop ? 'fixed-top z-top q-mx-md' : undefined"
      :search-term="searchInput"
      @is-loading="setIsLoading"
      @on-type-change="onTypeChange"
    />
  </div>
</template>
