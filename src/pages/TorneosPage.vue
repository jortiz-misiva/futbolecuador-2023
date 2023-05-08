<script lang="ts">
export default {
  preFetch: async ({ currentRoute: route, store }) => {
    if (route.params.torneo.includes('ecuador')) {
      let serie: 'serie-a' | 'serie-b' = 'serie-a';
      if (route.params.torneo == 'ecuadorb') serie = 'serie-b';

      const { preFetchTablaOgImage, matchOgImage } = useHistoryStore(store);
      if (!matchOgImage[serie]) {
        await preFetchTablaOgImage(serie);
      }
    }
  },
};
</script>

<script setup lang="ts">
import FutecPage from '@/shared/components/FutecPage.vue';
import TitleSection from '@/shared/components/TitleSection.vue';
import TaboolaWidget from '@/shared/components/ads/TaboolaWidget.vue';
import useMediaQuery from '@/composables/useMediaQuery';
import AdComponent from '@/shared/components/ads/AdComponent.vue';
import AdComponentPopup from '@/shared/components/ads/AdComponentPopup.vue';
import TorneosWidget from '@/components/torneos/TorneosWidget.vue';

import useHistoryStore from '@/stores/history';
import { useMeta } from 'quasar';
import { imgUrl } from '@/shared/helpers/functions';
import { useRoute } from 'vue-router';
import { onErrorCaptured } from 'vue';

const { isDesktopOrTablet, isMobile } = useMediaQuery();

const { matchOgImage } = useHistoryStore();

const route = useRoute();

if (route.params.torneo?.includes('ecuador') ?? true) {
  let serie: 'serie-a' | 'serie-b' = 'serie-a';
  if (route.params.torneo == 'ecuadorb') serie = 'serie-b';

  useMeta(() => {
    const img = imgUrl(
      matchOgImage[serie]?.replace('&hidePagesMenu=true', '') ?? ''
    );

    return {
      meta: {
        ogImage: {
          property: 'og:image',
          content: img,
        },
      },
    };
  });
}

onErrorCaptured((debug) => {
  console.log('Torneos error', debug);
});
</script>

<template>
  <FutecPage no-sidebar>
    <template v-slot:header>
      <AdComponent
        v-if="isDesktopOrTablet"
        adid="div-gpt-ad-1675196068572-0"
        google-tag="/1022247/FutEc_Leaderboard_Secciones"
        :arr-sizes="[
          [728, 90],
          [970, 90],
        ]"
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

    <TitleSection title="Torneos" class="q-mt-sm" />
    <TorneosWidget />

    <TaboolaWidget
      tid="taboola-below-torneo"
      placement="Below torneo"
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
