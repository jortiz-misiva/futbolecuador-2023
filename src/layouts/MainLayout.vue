<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import useMediaQuery from '@/composables/useMediaQuery';

import AdComponent from '@/shared/components/ads/AdComponent.vue';
import GoupButton from '@/shared/components/GoupButton.vue';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';

const FooterMobile = defineAsyncComponent(
  () => import('@/shared/components/footer/FooterMobile.vue')
);
const DrawerComponent = defineAsyncComponent(
  () => import('@/shared/components/drawer/DrawerComponent.vue')
);
const HeaderComponent = defineAsyncComponent(
  () => import('@/shared/components/header/HeaderComponent.vue')
);
const FooterDesktop = defineAsyncComponent(
  () => import('@/shared/components/footer/FooterDesktop.vue')
);

const { isDesktopOrTablet, isMobile } = useMediaQuery();

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <q-layout :view="!isDesktopOrTablet ? 'lHh Lpr lFf' : 'lHr lpr lfr'">
    <HeaderComponent />
    <DrawerComponent />

    <q-page-container>
      <router-view> </router-view>
    </q-page-container>
    <q-page-sticky style="z-index: 2" position="bottom" expand>
      <div class="bg-blue-grey-1">
        <AdComponent
          v-if="isDesktopOrTablet && $route.name == 'inicio' && showComponent"
          dissmisable
          adid="div-gpt-ad-1675197324032-0"
          google-tag="/1022247/SF_Desktop_Home"
          :arr-sizes="[728, 90]"
          min-width="728"
          min-height="90"
          can-show
        />
        <AdComponent
          v-else-if="
            isDesktopOrTablet && $route.name != 'inicio' && showComponent
          "
          dissmisable
          adid="div-gpt-ad-1675197494305-0"
          google-tag="/1022247/SF_Desktop_Secciones"
          :arr-sizes="[728, 90]"
          min-width="728"
          min-height="90"
          can-show
        />
      </div>
    </q-page-sticky>
    <FooterMobile v-if="isMobile" class="lt-sm" />
    <FooterDesktop v-if="isDesktopOrTablet" class="gt-xs" />
    <GoupButton v-if="isDesktopOrTablet" />
  </q-layout>
</template>
