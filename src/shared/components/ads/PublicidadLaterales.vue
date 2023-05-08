<script setup lang="ts">
import useMediaQuery from '@/composables/useMediaQuery';
import { ref } from 'vue';
import AdComponent from './AdComponent.vue';

interface Props {
  test?: boolean;
}
withDefaults(defineProps<Props>(), {
  test: false,
});

const offsetX = ref<number>(18);

const { isTabletLandscape } = useMediaQuery();

const onResize = (size: { height: number; width: number }) => {
  if (isTabletLandscape.value) {
    offsetX.value = 16;
    return;
  }
  offsetX.value = (size.width - 990) / 2 - 176;
};
</script>

<template>
  <!-- Publicidad laterales -->
  <q-resize-observer @resize="onResize" debounce="200" />
  <q-page-sticky position="top-left" :offset="[offsetX, 8]">
    <AdComponent
      :test="test"
      v-if="$route.name == 'resultados'"
      adid="div-gpt-ad-1681926632114-0"
      google-tag="/1022247/FutEc_Lateral-IZQ_Resultados"
      :arr-sizes="[160, 600]"
      min-height="600"
      min-width="160"
      class="z-top"
    />

    <AdComponent
      :test="test"
      v-else-if="$route.name == 'inicio'"
      adid="div-gpt-ad-1667233948865-0"
      google-tag="/1022247/FutEc_Lateral-IZQ_Home"
      :arr-sizes="[160, 600]"
      min-height="600"
      min-width="160"
      class="z-top"
    />

    <AdComponent
      v-else
      :test="test"
      adid="div-gpt-ad-1667237146892-0"
      google-tag="/1022247/FutEc_Lateral-IZQ_Secciones"
      :arr-sizes="[160, 600]"
      min-height="600"
      min-width="160"
      class="z-top"
    />
  </q-page-sticky>

  <q-page-sticky position="top-right" :offset="[offsetX, 8]">
    <AdComponent
      :test="test"
      v-if="$route.name == 'resultados'"
      adid="div-gpt-ad-1681926032306-0"
      google-tag="/1022247/FutEc_Lateral-DER_Resultados"
      :arr-sizes="[160, 600]"
      min-height="600"
      min-width="160"
      class="z-top"
    />

    <AdComponent
      :test="test"
      v-else-if="$route.name == 'inicio'"
      adid="div-gpt-ad-1667233868464-0"
      google-tag="/1022247/FutEc_Lateral-DER_Home"
      :arr-sizes="[160, 600]"
      min-height="600"
      min-width="160"
      class="z-top"
    />

    <AdComponent
      :test="test"
      v-else
      adid="div-gpt-ad-1667236982141-0"
      google-tag="/1022247/FutEc_Lateral-DER_Secciones"
      :arr-sizes="[160, 600]"
      min-height="600"
      min-width="160"
      class="z-top"
    />
  </q-page-sticky>
</template>
