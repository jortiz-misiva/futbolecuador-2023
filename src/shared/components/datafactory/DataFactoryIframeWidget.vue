<script setup lang="ts">
import useDatafactory from 'src/composables/useDatafactory';
import { ref, toRef, watch } from 'vue';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import { debounce } from 'quasar';
import { useRoute } from 'vue-router';

interface Props {
  id: string;
  src: string;
  theme?: string;
  scrolling?: 'auto' | 'no';
  minHeight?: string;
  customWidth?: string;
  customHeight?: string;
  customClass?: string;
  borderRadius?: string;
  autoResize?: boolean;
  test?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'MisivaThemeNew',
  scrolling: 'no',
  minHeight: '400px',
  customWidth: '100%',
  customHeight: '400px',
  borderRadius: '0px',
  autoResize: true,
  customClass: '',
  test: false,
});

const id = toRef(props, 'id');
const src = toRef(props, 'src');
const theme = toRef(props, 'theme');
const showWidget = ref<boolean>(false);

const { resizeIframe } = useDatafactory();
const route = useRoute();

function srcHandle(): string {
  const randomParam = Math.floor(Math.random() * 1000000000);
  let url = `https://datafactory.futbolecuador.com/html/v3/${src.value}`;

  if (url.includes('?'))
    url += `&theme=${theme.value}&lang=es_LA&t=${randomParam}`;
  else url += `?theme=${theme.value}&lang=es_LA&t=${randomParam}`;
  return url;
}

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);

const debounceResize = debounce(() => {
  resizeIframe(id.value);
}, 200);

const fireDF = () => {
  showWidget.value = true;
  if (!props.autoResize || props.test || process.env.SERVER) return;
  debounceResize();
};

watch(
  showComponent,
  () => {
    if (!showComponent.value && route.name == 'inicio') return;
    fireDF();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div v-if="!src || src.includes('futbolecuador.com')" class="q-pa-md">
    <span class="text-body">Error: src no valido</span>
  </div>
  <div
    v-else-if="!showWidget"
    :style="{
      minWidth: customWidth,
      minHeight: customHeight,
    }"
  ></div>
  <iframe
    v-else-if="!test"
    :id="id"
    :src="srcHandle()"
    :width="customWidth"
    :height="customHeight"
    :scrolling="scrolling"
    style="border: 0"
    loading="lazy"
    :style="
      customWidth.includes('%') && !customClass
        ? `width: 1px; min-width: ${customWidth}; *width: ${customWidth}; min-height: ${minHeight}; border-radius: ${borderRadius}`
        : `min-height: ${minHeight}; border-radius: ${borderRadius}`
    "
    :class="`${customClass}`"
  ></iframe>
</template>
