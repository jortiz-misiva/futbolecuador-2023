<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import useCaTag from '@/composables/useCaTag';
import useMediaQuery from '@/composables/useMediaQuery';
import { Chip } from '@/shared/components/FilterSlider.vue';
import { useMeta } from 'quasar';

const DataFactoryIframeWidget = defineAsyncComponent(
  () => import('@/shared/components/datafactory/DataFactoryIframeWidget.vue')
);
const FilterSlider = defineAsyncComponent(
  () => import('@/shared/components/FilterSlider.vue')
);
const SpinnerDots = defineAsyncComponent(
  () => import('@/shared/components/SpinnerDots.vue')
);
const NoticiaPrincipal = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaPrincipal.vue')
);
const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);

const route = useRoute();
const router = useRouter();

const chipsTorneos: Chip[] = [
  {
    name: 'Liga Pro Serie A',
    value: 'ecuador',
    tag: 'serie-a',
  },
  {
    name: 'Liga Pro Serie B',
    value: 'ecuadorb',
    tag: 'serie-b',
  },
  {
    name: 'Copa Libertadores',
    value: 'libertadores',
    tag: 'libertadores',
  },
  {
    name: 'Copa Sudamericana',
    value: 'sudamericana',
    tag: 'sudamericana',
  },
  {
    name: 'Champions League',
    value: 'champions',
    tag: 'champions-league',
  },
  {
    name: 'Europa League',
    value: 'uefa',
    tag: 'europa-league',
  },
  {
    name: 'LaLiga España',
    value: 'espana',
    tag: 'laliga',
  },
  {
    name: 'Premier League',
    value: 'premierleague',
    tag: 'premier-league',
  },
  {
    name: 'Serie A Italia',
    value: 'italia',
    tag: 'serie-a-italia',
  },
  {
    name: 'Bundesliga',
    value: 'alemania',
    tag: 'bundesliga',
  },
  {
    name: 'Ligue 1 Francia',
    value: 'francia',
    tag: 'ligue-1',
  },
];

const subMenu: Chip[] = [
  {
    name: 'Noticias',
    value: 'noticias',
  },
  {
    name: 'Calendario',
    value: 'fixture',
  },
  {
    name: 'Posiciones',
    value: 'posiciones',
  },
  {
    name: 'Goleadores',
    value: 'goleadores',
  },
  {
    name: 'Equipos',
    value: 'planteles',
  },
];

const selectedTorneo = ref<Chip>(chipsTorneos[0]);
const selectedSubmenu = ref<Chip>(subMenu[1]);
const term = ref<string>(chipsTorneos[0].tag ?? '');
const type = ref('tag');

const navigate = () => {
  router.push(
    `/torneos/${selectedTorneo.value.value}/${selectedSubmenu.value.value}`
  );
};

const onTapTorneo = (value: string, tag?: string) => {
  selectedTorneo.value = {
    ...selectedTorneo.value,
    value,
  };
  term.value = tag ?? '';
  navigate();
};

const onTapSubmenu = (value: string) => {
  selectedSubmenu.value = {
    ...selectedSubmenu.value,
    value,
  };
  navigate();
};

const url = computed<string>(
  () =>
    `page.html?channel=deportes.futbol.${selectedTorneo.value.value}&lang=es_LA&page=${selectedSubmenu.value.value}`
);

const keyID = computed<string>(
  () => `${selectedTorneo.value.value}-${selectedSubmenu.value.value}`
);

const setTorneoSubmenu = () => {
  const { torneo, submenu } = route.params;

  if (!torneo && !submenu) return;
  const findTorneo = chipsTorneos.find((e) => e.value == torneo.toString());
  if (findTorneo) {
    selectedTorneo.value = findTorneo ?? selectedTorneo.value;
    term.value = findTorneo.tag?.toString() ?? term.value;
  }

  if (submenu) {
    selectedSubmenu.value =
      subMenu.find((e) => e.value == submenu.toString()) ??
      selectedSubmenu.value;
  }
};

setTorneoSubmenu();

watch(route, () => {
  setTorneoSubmenu();
});

useMeta(() => {
  return {
    title: `Torneos: ${selectedTorneo.value.name} ${selectedSubmenu.value.name}`,
  };
});

const { catagQuery } = useCaTag(term, type, {
  autoloadInfinity: false,
});

const { isLoading, data } = catagQuery;

const { isDesktopOrTabletLandscape } = useMediaQuery();
</script>

<template>
  <section>
    <FilterSlider
      :chips="chipsTorneos"
      :selected="selectedTorneo.value"
      @on-tap="onTapTorneo"
      dark
    />
    <FilterSlider
      :chips="subMenu"
      :selected="selectedSubmenu.value"
      @on-tap="onTapSubmenu"
    />
    <DataFactoryIframeWidget
      v-if="selectedSubmenu.value != 'noticias'"
      :key="keyID"
      :id="keyID"
      :src="url"
    />

    <div v-else-if="!isLoading" class="column q-gutter-y-sm">
      <NoticiaPrincipal
        :noticia="data!.noticias[0]"
        :horizontal="isDesktopOrTabletLandscape"
      />

      <div class="column">
        <div
          class="column no-wrap"
          v-for="(noticia, i) in data!.noticias?.slice(1, 4)"
          :key="noticia.id"
        >
          <NoticiaSecundaria :noticia="noticia" :image="false" />
          <q-separator
            v-if="i < 2"
            inset
            color="blue-grey-2"
            style="z-index: 1"
          />
        </div>
      </div>

      <NoticiaSecundaria
        v-for="noticia in data!.noticias?.slice(4, 7)"
        :key="noticia.id"
        :noticia="noticia"
        :horizontal="isDesktopOrTabletLandscape"
      />
    </div>
    <SpinnerDots v-else />
  </section>
</template>
