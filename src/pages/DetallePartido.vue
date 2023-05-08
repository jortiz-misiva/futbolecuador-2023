<script lang="ts">
import { defineComponent, ref } from 'vue';
import useHistoryStore from '@/stores/history';
import { useRoute } from 'vue-router';

export default defineComponent({
  preFetch: async ({ currentRoute: route }) => {
    const { preFetcPartidoDetalle } = useHistoryStore();
    await preFetcPartidoDetalle(+route.params.id);
  },
});
</script>

<script setup lang="ts">
import { date, useMeta } from 'quasar';

import useMediaQuery from '@/composables/useMediaQuery';
import { DetallePartido } from '@/interfaces/partidos';
import { imgUrl } from '@/shared/helpers/functions';

import TitleSection from '@/shared/components/TitleSection.vue';
import FutecPage from '@/shared/components/FutecPage.vue';
import TaboolaWidget from '@/shared/components/ads/TaboolaWidget.vue';
import AdComponent from '@/shared/components/ads/AdComponent.vue';
const route = useRoute();

const { isMobile, isDesktopOrTablet } = useMediaQuery();

const { partidosDetalle } = useHistoryStore();
const partido = ref<DetallePartido>(partidosDetalle[+route.params.id]);

useMeta({
  title: `Marcador: ${partido.value.local.informacion.name} VS  ${partido.value.visitante.informacion.name}`,
});
</script>

<template>
  <FutecPage no-sidebar>
    <TitleSection title="Ecuador Liga Pro 2023" />
    <!-- Fecha / estado -->
    <div
      class="row q-pa-sm bg-white justify-center shadow-1 items-center text-bold"
    >
      <div
        v-if="partido.partido.state > 0 && partido.partido.state < 8"
        class="row items-center"
      >
        <q-icon name="circle" color="red" size="xs" class="q-mr-sm" />
        <span class="text-bold">EN DIRECTO</span>
      </div>
      <div v-if="partido.partido.state == 0">
        {{
          date.formatDate(
            partido.partido.dm.replace(' ', 'T'),
            'D-MM-YYYY | HH:mm'
          )
        }}
        hs.
      </div>
      <div class="text-bold q-px-sm" v-if="partido.partido.state != 8">-</div>

      <div class="column no-wrap col" v-if="partido.partido.state == 1">
        PRIMER TIEMPO
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 2">
        FIN PRIMER TIEMPO
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 3">
        SEGUNDO TIEMPO
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 4">
        FIN SEGUNDO TIEMPO
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 5">
        PRIMER EXTRA
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 6">
        SEGUNDO EXTRA
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 7">
        PENALES
      </div>
      <div class="column no-wrap col" v-else-if="partido.partido.state == 8">
        FINALIZADO
        {{
          date.formatDate(
            partido.partido.dm.replace(' ', 'T'),
            'D-MM-YYYY | HH:mm'
          )
        }}
        hs.
      </div>
      <div v-else>
        {{
          date
            .formatDate(partido.partido.dm.replace(' ', 'T'), 'dddd')
            ?.toUpperCase() ?? ''
        }}
      </div>
    </div>

    <!-- Scores -->
    <div class="row q-pa-md bg-white justify-center shadow-1 items-center">
      <template v-if="isMobile">
        <div class="full-width row no-wrap q-py-sm justify-center text-body2">
          <div class="col-5 text-right text-bold text-overflow-1">
            {{ partido.local.informacion.name }}
          </div>
          <div class="col text-center text-bold">VS</div>
          <div class="col-5 text-left text-bold text-overflow-1">
            {{ partido.visitante.informacion.name }}
          </div>
        </div>
      </template>
      <div
        class="row no-wrap col-5 text-bold items-center q-gutter-sm justify-end"
      >
        <span v-if="isDesktopOrTablet" class="team-name">{{
          partido.local.informacion.name
        }}</span>
        <img
          :src="imgUrl(partido.local.informacion.shield_big)"
          class="shadow-3"
        />
        <span class="text-center bg-primary score">{{
          partido.partido.result.split('-')[0]
        }}</span>
      </div>
      <div class="col-shrink text-center text-bold text-h6 q-px-md">-</div>
      <div class="row no-wrap col-5 text-bold items-center q-gutter-sm">
        <span class="text-center bg-primary score">{{
          partido.partido.result.split('-')[1]
        }}</span>
        <img
          :src="imgUrl(partido.visitante.informacion.shield_big)"
          class="shadow-3"
        />
        <span v-if="isDesktopOrTablet" class="team-name">
          {{ partido.visitante.informacion.name }}
        </span>
      </div>
    </div>

    <!-- Goles -->
    <div class="row reverse col q-gutter-sm" style="min-height: 300px">
      <div class="col-xs-12 col-md bg-white shadow-2">
        <TitleSection title="Goles de visitante" />
        <div
          v-if="!partido.visitante.jugadores.length"
          class="column items-center q-pa-md text-body1"
        >
          Sin goles
        </div>

        <div
          v-for="(jugador, i) in partido.visitante.jugadores"
          :key="i"
          class="row no-wrap q-pa-md item"
          :class="{ 'bg-blue-grey-1': !(i % 2 == 0) }"
        >
          <div class="col text-weight-medium q-pl-md text-body1">
            {{ jugador.nombre }}
          </div>
          <div
            class="col-1 text-bold text-center bg-primary text-white"
            style="border-radius: 100px; line-height: 2"
          >
            {{ jugador.minuto }} '
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md bg-white shadow-2">
        <TitleSection title="Goles de local" />
        <div
          v-if="!partido.local.jugadores.length"
          class="column items-center q-pa-md text-body1"
        >
          Sin goles
        </div>
        <div
          v-for="(jugador, i) in partido.local.jugadores"
          :key="i"
          class="row no-wrap q-pa-md item"
          :class="{ 'bg-blue-grey-1': !(i % 2 == 0) }"
        >
          <div class="col text-weight-medium q-pl-md text-body1">
            {{ jugador.nombre }}
          </div>
          <div
            class="col-2 text-bold text-center bg-primary text-white"
            style="border-radius: 100px; line-height: 2"
          >
            {{ jugador.minuto }} '
          </div>
        </div>
      </div>
    </div>

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
        view
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

<style lang="scss" scoped>
.team-name {
  font-size: 1.5rem;
}

.score {
  display: inline-block;
  color: white;
  font-size: 1.8rem;
  border-radius: 100px;
  width: 45px;
  height: 45px;
}

img {
  object-fit: contain;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  overflow: hidden;
  padding: 4px;
}
</style>
