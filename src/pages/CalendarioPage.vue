<script setup lang="ts">
import TitleSection from '@/shared/components/TitleSection.vue';
import useMediaQuery from '@/composables/useMediaQuery';
import FutecPage from '@/shared/components/FutecPage.vue';
import CalendarioPartidos from '@/shared/components/tablas/CalendarioPartidos.vue';
import TaboolaWidget from '@/shared/components/ads/TaboolaWidget.vue';
import AdComponent from '@/shared/components/ads/AdComponent.vue';
import AdComponentPopup from '@/shared/components/ads/AdComponentPopup.vue';
import { useMeta } from 'quasar';

useMeta(() => {
  return {
    title: 'Calendario',
  };
});

const { isDesktopOrTablet, isMobile } = useMediaQuery();
</script>

<template>
  <FutecPage>
    <template v-slot:header>
      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1667236395933-0"
        google-tag="/1022247/FutEc_Leaderboard_Secciones"
        :arr-sizes="[728, 90]"
        min-width="728"
        min-height="90"
      />
    </template>

    <AdComponent
      v-if="isMobile"
      adid="div-gpt-ad-1659048379970-0"
      google-tag="/1022247/FutEc_Top_Mobile_Secciones"
      :arr-sizes="[320, 100]"
      min-width="320"
      min-height="100"
    />

    <TitleSection title="Calendario LigaPro Bet593 2023" class="q-mt-sm" />
    <CalendarioPartidos />

    <AdComponent
      class="q-pt-sm"
      v-if="isMobile"
      adid="div-gpt-ad-1666391387960-0"
      google-tag="/1022247/BoxBanner_Mobile_Secciones"
      :arr-sizes="[
        [320, 50],
        [320, 100],
        [300, 50],
        [300, 250],
      ]"
      min-height="50"
      min-width="300"
    />

    <TaboolaWidget
      tid="taboola-below-calendar"
      placement="Below Calendar"
      :mode="isMobile ? 'thumbnails-a' : 'thumbnails-b'"
    />
    <template v-slot:footer>
      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1675197002357-0"
        google-tag="/1022247/FutEc_Billboard_Desktop_Secciones"
        :arr-sizes="[
          [970, 250],
          [970, 90],
          [728, 90],
        ]"
        min-width="728"
        min-height="90"
      />
    </template>

    <!-- Pops publicitarios secciones-->
    <AdComponentPopup
      v-if="isDesktopOrTablet"
      adid="div-gpt-ad-1667237284533-0"
      google-tag="/1022247/FutEc_SplashDesktop_Secciones"
      :arr-sizes="[800, 600]"
      min-width="800"
      min-height="600"
    />
    <AdComponentPopup
      v-else
      adid="div-gpt-ad-1667238145689-0"
      google-tag="/1022247/FutEc_SplashMobile_Secciones"
      :arr-sizes="[320, 480]"
      min-width="320"
      min-height="480"
    />
  </FutecPage>
  <!-- banner 1x1 -->
  <AdComponent
    v-if="isDesktopOrTablet"
    adid="div-gpt-ad-1680552978200-0"
    google-tag="/1022247/Skin_Desktop_Secciones_1x1"
    :arr-sizes="[1, 1]"
    min-width="1"
    min-height="1"
  />
</template>
