<script setup lang="ts">
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import { toRefs, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = withDefaults(
  defineProps<{
    tid: string;
    placement: string;
    article?: string;
    mode?: string;
    test?: boolean;
  }>(),
  { article: 'auto', mode: 'thumbnails-b', test: false }
);

const { tid, placement, article, mode } = toRefs(props);

const taboola = ref<HTMLDivElement>();

const onView = () =>
  // entry: { isIntersecting: boolean }
  {
    if (process.env.SERVER || props.test) return;
    // if (!entry.isIntersecting) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text =
      'window._taboola = window._taboola || [];\n' +
      '_taboola.push({\n' +
      'mode: "' +
      mode.value +
      '",\n' +
      'container: "' +
      tid.value +
      '",\n' +
      'placement: "' +
      placement.value +
      '",\n' +
      'target_type: "mix",\n' +
      '});\n' +
      '_taboola.push({ article: "' +
      article.value +
      '", url: "https://futbolecuador.com' +
      route.fullPath +
      '" });';

    taboola.value?.appendChild(script);
  };

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);

watch(showComponent, () => {
  if (!showComponent.value) return;
  onView();
});

onMounted(() => {
  if (!showComponent.value) return;
  onView();
});
</script>

<template>
  <div
    ref="taboola"
    :id="tid"
    class="alto-taboola row justify-center"
    style="min-height: 700px"
  >
    <q-skeleton width="100%" height="700px" />
  </div>
</template>
