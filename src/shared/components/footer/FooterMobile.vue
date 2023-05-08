<script setup lang="ts">
import useMediaQuery from '@/composables/useMediaQuery';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const NavBarComponent = defineAsyncComponent(
  () => import('../navbar/NavBarComponent.vue')
);

const AdComponent = defineAsyncComponent(
  () => import('@/shared/components/ads/AdComponent.vue')
);

const { isMobile } = useMediaQuery();

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <q-footer class="bg-white" bordered>
    <div class="bg-blue-grey-1">
      <template v-if="isMobile && showComponent">
        <AdComponent
          v-if="$route.name == 'resultados'"
          adid="'div-gpt-ad-1681926762861-0"
          google-tag="/1022247/FutEc_TopMobile_SeccionResultados"
          :arr-sizes="[320, 100]"
          min-width="320"
          min-height="50"
          dissmisable
          can-show
        />

        <AdComponent
          v-else-if="$route.name != 'inicio'"
          adid="div-gpt-ad-1673993871479-0"
          google-tag="/1022247/Banner_Mobile_Secciones_Bottom"
          :arr-sizes="[
            [320, 100],
            [320, 50],
            [300, 50],
            [300, 100],
          ]"
          min-width="320"
          min-height="50"
          dissmisable
          can-show
        />

        <AdComponent
          v-else
          adid="div-gpt-ad-1673641377508-0"
          google-tag="/1022247/BannerMobile_Home_Bottom"
          :arr-sizes="[
            [300, 50],
            [320, 50],
            [320, 100],
            [300, 100],
          ]"
          min-width="320"
          min-height="50"
          dissmisable
          can-show
        />
      </template>
    </div>

    <NavBarComponent />
  </q-footer>
</template>
