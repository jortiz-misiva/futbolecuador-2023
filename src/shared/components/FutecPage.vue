<script setup lang="ts">
import useMediaQuery from '@/composables/useMediaQuery';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const PublicidadLaterales = defineAsyncComponent(
  () => import('./ads/PublicidadLaterales.vue')
);

const SidebarComponent = defineAsyncComponent(
  () => import('./sidebar/SidebarComponent.vue')
);

interface Props {
  noSidebar?: boolean;
}

defineProps<Props>();

const { isDesktopOrTabletLandscape, isDesktopOrTablet } = useMediaQuery();

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <q-page
    :id="$route.name"
    class="futec-container q-gutter-y-sm"
    :class="{ 'q-py-sm': isDesktopOrTablet }"
  >
    <slot name="header"></slot>
    <div class="row no-wrap">
      <div
        class="col column no-wrap q-gutter-y-sm overflow-hidden"
        :class="{
          'q-mr-sm': isDesktopOrTablet,
          'col-xs-12 col-sm-7 col-lg-8': !noSidebar,
        }"
      >
        <slot>Contenido</slot>
      </div>
      <SidebarComponent
        v-if="isDesktopOrTablet && !noSidebar"
        class="col gt-xs"
      />
    </div>
    <slot name="footer"></slot>
  </q-page>
  <PublicidadLaterales v-if="isDesktopOrTabletLandscape && showComponent" />
</template>
