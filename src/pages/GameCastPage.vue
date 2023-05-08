<script lang="ts">
import { defineComponent } from 'vue';
import useHistoryStore from '@/stores/history';

export default defineComponent({
  preFetch: async ({ currentRoute: route }) => {
    const { preFetchMatchOgImage } = useHistoryStore();
    await preFetchMatchOgImage(`${route.params.id}`);
  },
});
</script>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';

import useMediaQuery from '@/composables/useMediaQuery';
import AdComponent from '@/shared/components/ads/AdComponent.vue';
import TaboolaWidget from '@/shared/components/ads/TaboolaWidget.vue';
import DataFactoryIframeWidget from '@/shared/components/datafactory/DataFactoryIframeWidget.vue';
import { imgUrl } from '@/shared/helpers/functions';

import FutecPage from '@/shared/components/FutecPage.vue';

const { isDesktopOrTablet, isMobile } = useMediaQuery();
const route = useRoute();

const { matchOgImage } = useHistoryStore();

useMeta(() => {
  const img = imgUrl(
    matchOgImage[`${route.params.id}`]?.replace('&hidePagesMenu=true', '') ?? ''
  );

  return {
    title: `Marcador en vivo: ${(route.params.titulo?.toString() ?? '').replace(
      /-/g,
      ' '
    )}`,
    meta: {
      ogImage: {
        property: 'og:image',
        content: img,
      },
    },
  };
});
</script>

<template>
  <FutecPage no-sidebar>
    <DataFactoryIframeWidget
      id="gamecast"
      :src="`minapp/modules/futbol/gamecast/gamecast.html?channel=${$route.params.id}&page=gamecast&hidePagesMenu=false&hideTournamentsMenu=false`"
      scrolling="auto"
      min-height="1200px"
    />

    <TaboolaWidget
      class="q-pa-sm rounded-borders bg-white"
      tid="taboola-below-article-thumbnails"
      placement="Below Article Thumbnails"
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
