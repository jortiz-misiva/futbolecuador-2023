<script setup lang="ts">
import useScoreboards from '@/composables/useScoreboards';
import { Torneo } from '@/interfaces/scoreboards';
import { watch, defineAsyncComponent, ref, onMounted } from 'vue';
import { Chip } from '../FilterSlider.vue';

const FilterSlider = defineAsyncComponent(() => import('../FilterSlider.vue'));
const CustomSkeleton = defineAsyncComponent(
  () => import('../CustomSkeleton.vue')
);

const torneoId = ref<number>(94);
const roundId = ref<number>(359);

const { scoreboardQuery, torneosQuery } = useScoreboards(torneoId, roundId);

const { isLoading: isLoadingResultados, data: resultadosTorneo } =
  scoreboardQuery;
const { data: torneosData } = torneosQuery;

const torneos = ref<Chip[]>([]);
const selectedTorneo = ref<Torneo>();
const rondas = ref<Chip[]>([]);

const setupTorneos = () => {
  torneos.value =
    torneosData.value?.map((x) => {
      return {
        name: x.name,
        value: `${x.id}`,
      };
    }) || [];

  selectedTorneo.value = selectedTorneo.value ?? torneosData.value?.at(0);
  rondas.value =
    selectedTorneo.value?.rondas.map((x) => {
      return { name: x.name, value: `${x.id}` };
    }) || [];
};

const onTap = (value: string) => {
  const round = +value;
  if (roundId.value == round) return;
  roundId.value = round;
};

const onTapTorneo = (value: string) => {
  if (selectedTorneo.value?.id == +value) return;
  selectedTorneo.value = torneosData.value?.find((x) => x.id == +value);
  torneoId.value = +value;
  roundId.value = selectedTorneo.value?.active_round ?? 0;
  setupTorneos();
};

watch(torneosData, () => {
  if (!torneosData.value) return;
  setupTorneos();
});

onMounted(() => {
  if (torneosData.value && !selectedTorneo.value) setupTorneos();
});
</script>

<template>
  <div class="column no-wrap overflow-hidden bg-white q-pb-md">
    <FilterSlider
      :chips="torneos"
      dark
      :selected="`${torneoId}`"
      @on-tap="onTapTorneo"
    />

    <template v-if="rondas.length > 1">
      <FilterSlider
        :chips="rondas"
        :selected="`${roundId}`"
        dark
        @on-tap="onTap"
      />
    </template>
    <template v-if="!isLoadingResultados">
      <RouterLink
        v-for="(equipo, i) in resultadosTorneo?.posiciones"
        :to="{ name: 'categoria', params: { term: equipo['slug-categoria'] } }"
        :key="equipo.id"
        class="row no-wrap q-pa-xs item"
        :class="{ 'bg-blue-grey-1': !(i % 2 == 0) }"
      >
        <div v-ripple class="col-1 text-bold text-center relative-position">
          {{ i + 1 }}
        </div>
        <div class="col text-weight-medium">
          <img
            :alt="equipo.name"
            :src="`https://www.futbolecuador.com/${equipo.mini_shield}`"
            width="20"
            height="20"
            loading="lazy"
            class="q-mx-sm"
          />
          {{ equipo.name }}
        </div>
        <div
          class="col-1 text-bold text-center bg-primary text-white"
          style="border-radius: 100px; line-height: 2"
        >
          {{ equipo.points }}
        </div>
      </RouterLink>
    </template>

    <CustomSkeleton v-else style="height: 500px !important" />
  </div>
</template>

<style scoped lang="scss">
.item {
  transition: 0.2s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -ms-transform: translateZ(0); /* IE 9 */
  -webkit-transform: translateZ(0); /* Chrome, Safari, Opera */
  transform: translateZ(0);
}
.item:hover {
  transition: 0.2s;
  background-color: rgba($color: $accent, $alpha: 0.2) !important;
}

.text-weight-medium {
  transition: 0.2s;
}
.item:hover .text-weight-medium {
  transition: 0.2s;
  transform: scale(1.1);
}
</style>
