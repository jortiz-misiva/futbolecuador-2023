<script setup lang="ts">
import useMasleidas from '@/composables/useMasleidas';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';
import DataFactoryIframeWidget from '../datafactory/DataFactoryIframeWidget.vue';

const TitleSection = defineAsyncComponent(() => import('../TitleSection.vue'));

const AdComponent = defineAsyncComponent(
  () => import('../ads/AdComponent.vue')
);

const VideoAdComponent = defineAsyncComponent(
  () => import('../ads/VideoAdComponent.vue')
);

const NoticiaSecundaria = defineAsyncComponent(
  () => import('@/components/noticias/NoticiaSecundaria.vue')
);

const CalendarioPartidos = defineAsyncComponent(
  () => import('../tablas/CalendarioPartidos.vue')
);

const TablaPosiciones = defineAsyncComponent(
  () => import('../tablas/TablaPosiciones.vue')
);

const SpotifyWidget = defineAsyncComponent(
  () => import('../spotify/SpotifyWidget.vue')
);

const { masleidasQuery } = useMasleidas(5);
const { data: masleidas, isLoading } = masleidasQuery;

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <div class="column no-wrap q-gutter-y-sm">
    <AdComponent
      v-if="$route.name == 'inicio'"
      adid="div-gpt-ad-1681924797265-0"
      google-tag="/1022247/FutEc_Boton_Desktop"
      :arr-sizes="[300, 90]"
      min-width="300"
      min-height="90"
    />

    <AdComponent
      v-if="$route.name != 'resultados' && showComponent"
      adid="div-gpt-ad-1667233499775-0"
      google-tag="/1022247/FE_HP_1"
      :arr-sizes="[300, 250]"
      min-width="300"
      min-height="250"
    />

    <template v-if="$route.name != 'inicio' && showComponent">
      <section>
        <TitleSection title="Vídeo del día" />
        <VideoAdComponent
          source="fcp"
          video-id="MANUAL_2eb408cd-008a-44ef-b580-372c7ff2319d"
        />
      </section>
    </template>

    <template v-if="$route.name != 'torneos' && showComponent">
      <section>
        <TitleSection title="Calendario" />
        <CalendarioPartidos />
      </section>
    </template>

    <AdComponent
      v-if="$route.name != 'inicio' && showComponent"
      adid="div-gpt-ad-1667237599252-0"
      google-tag="/1022247/FutEc_FilmStrip_Secciones"
      :arr-sizes="[
        [300, 600],
        [300, 250],
      ]"
      min-width="300"
      min-height="250"
    />

    <!-- Widget Spotify -->
    <SpotifyWidget v-if="showComponent" />

    <template v-if="showComponent">
      <section>
        <TitleSection title="Tabla de posiciones" />
        <TablaPosiciones />
      </section>
    </template>

    <AdComponent
      v-if="$route.name == 'inicio' && showComponent"
      adid="div-gpt-ad-1667235186188-0"
      google-tag="/1022247/FutEc_Square_Home_1"
      :arr-sizes="[300, 250]"
      min-width="300"
      min-heigh="250"
      view
    />

    <template
      v-if="!isLoading && !$route.name?.toString().includes('noticiaAbierta')"
    >
      <section>
        <TitleSection title="Mas leídas" />
        <div v-for="(noticia, i) in masleidas" :key="noticia.id">
          <NoticiaSecundaria :noticia="noticia" :image="false" />
          <q-separator
            v-if="i < 4"
            inset
            color="blue-grey-2"
            style="z-index: 1"
          />
        </div>
      </section>
    </template>

    <AdComponent
      v-if="$route.name == 'inicio' && showComponent"
      adid="div-gpt-ad-1667235286661-0"
      google-tag="/1022247/FutEc_Square_Home_2"
      :arr-sizes="[300, 250]"
      min-width="300"
      min-heigh="250"
      view
    />

    <template v-if="$route.name == 'inicio' && showComponent">
      <section>
        <TitleSection title="Vídeo del día" />
        <VideoAdComponent
          source="fcp"
          video-id="MANUAL_2eb408cd-008a-44ef-b580-372c7ff2319d"
        />
      </section>
    </template>

    <template v-if="$route.name == 'inicio' && showComponent">
      <section class="q-pb-xl">        
        <DataFactoryIframeWidget
          id="agenda-vertical"
          src="htmlCenter/data/deportes/futbol/todos/pages/es/agenda_vertical.html"
          custom-height="100%"
        />
      </section>
      <section>
        <TitleSection title="Compare equipos" />
        <DataFactoryIframeWidget
          id="compare-equipos"
          src="minapp/modules/futbol/statsCenterTeamComparison/statsCenterTeamComparison.html?channel=deportes.futbol.ecuador.statsCenterTeamComparison&lang=es_LA"
          custom-height="100%"
        />
      </section>
      <section>
        <TitleSection title="Compare jugadores" />
        <DataFactoryIframeWidget
          id="compare-jugadores"
          src="minapp/modules/futbol/statsCenterPlayerComparison/statsCenterPlayerComparison.html?channel=deportes.futbol.ecuador.statsCenterPlayerComparison&lang=es_LA"
          custom-height="100%"
        />
      </section>     

      <template v-if="$route.name == 'inicio' && showComponent">
        <section class="q-pb-xl">
          <TitleSection title="Goleadores" />
          <DataFactoryIframeWidget
            id="goleadores"
            src="page.html?channel=deportes.futbol.ecuador&page=goleadores"
            custom-height="100%"
          />
        </section>
      </template>
    </template>
  </div>
</template>
