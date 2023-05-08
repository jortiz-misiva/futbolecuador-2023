<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, computed, watch } from 'vue';
import useCalendario from '@/composables/useCalendario';
import { Torneo } from '@/interfaces/scoreboards';
import { date } from 'quasar';
import { cleanText } from '@/shared/helpers/functions';
import { Chip } from '../FilterSlider.vue';

import FilterSlider from '../FilterSlider.vue';

const CustomSkeleton = defineAsyncComponent(
  () => import('../CustomSkeleton.vue')
);

const TitleSection = defineAsyncComponent(() => import('../TitleSection.vue'));

const torneoId = ref<number>(94);
const rondas = ref<Chip[]>([]);
const rondaId = ref<string>('359');

const fecha = ref<number | undefined>();

const { calendarioQuery, torneosQuery } = useCalendario(
  rondaId,
  fecha,
  torneoId
);

const { isLoading: isLoadingCalenario, data: calendario } = calendarioQuery;

const { data: torneosData } = torneosQuery;

const torneos = ref<Chip[]>([]);
const selectedTorneo = ref<Torneo>();
const fechas = ref<Chip[]>([]);

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
  fecha.value = Number(selectedTorneo.value?.fecha_activa ?? '0');
};

const setupCalendario = () => {
  fechas.value = Array.from(
    { length: calendario.value?.total ?? 0 },
    (_, i) => {
      const chip: Chip = {
        name: `${i + 1}`,
        value: `${i}`,
      };
      return chip;
    }
  );
};

const showCalendar = ref<boolean>(false);

const onTapRondas = (value: string) => {
  const round = value;
  if (rondaId.value == round) return;
  rondaId.value = round;
};

const onTapOpciones = (value: string) => {
  if (value == 'fechasiguiente') {
    fecha.value = Number(fecha.value) + 1;
  }

  if (value == 'fechaanterior') {
    fecha.value = Number(fecha.value) - 1;
  }

  if (value == 'calendar') {
    showCalendar.value = !showCalendar.value;
  }
};

const onTapFechas = (value: string) => {
  if (fecha.value == Number(value)) return;
  fecha.value = Number(value);
};

const onTapTorneo = (value: string) => {
  if (selectedTorneo.value?.id == +value) return;
  selectedTorneo.value = torneosData.value?.find((x) => x.id == +value);
  torneoId.value = +value;
  rondaId.value = `${selectedTorneo.value?.active_round}`;
  setupTorneos();
};

watch(torneosData, () => {
  if (!torneosData.value) return;
  setupTorneos();
});

watch(calendario, () => {
  if (!calendario.value) return;
  setupCalendario();
});

onMounted(() => {
  setupTorneos();
  setupCalendario();
});

const options = computed<Chip[]>(() => {
  const seletedFecha = Number(fecha.value);
  let chipOptions: Chip[] = [
    {
      icon: 'calendar_month',
      value: 'calendar',
    },
  ];
  if (isNaN(seletedFecha)) return chipOptions;

  if (seletedFecha > 0) {
    chipOptions.unshift({
      name: 'Fecha anterior',
      value: 'fechaanterior',
    });
  }

  if (seletedFecha < fechas.value.length - 1) {
    chipOptions.unshift({
      name: 'Fecha siguiente',
      value: 'fechasiguiente',
    });
  }

  return chipOptions;
});
</script>
<template>
  <div class="overflow-hidden column no-wrap" :class="{
    'bg-white': isLoadingCalenario,
  }">
    <FilterSlider :chips="torneos" :selected="`${torneoId}`" @on-tap="onTapTorneo" dark />
    <template v-if="rondas.length > 1">
      <FilterSlider dark :chips="rondas" :selected="rondaId" @on-tap="onTapRondas" />
    </template>
    <FilterSlider :chips="options" @on-tap="onTapOpciones" class="bg-white q-mb-xs" />

    <q-slide-transition>
      <FilterSlider v-show="showCalendar" :chips="fechas" :selected="`${fecha ?? ''}`" @on-tap="onTapFechas"
        class="bg-white q-mb-sm" no-scroll />
    </q-slide-transition>
    <template v-if="!isLoadingCalenario">
      <TitleSection :title="`Fecha ${Number(fecha) + 1}`" style="text-align: center" />
      <router-link v-ripple :to="
        !!partido.datafactory_id
          ? {
            name: 'partido',
            params: {
              titulo: cleanText(
                `${partido.mt[0].local.name}-VS-${partido.mt[0].visitante.name}`
              ).replace(/ /g, '-'),
              id: partido.datafactory_id,
            },
          }
          : {
            name: 'partidoDetalle',
            params: {
              titulo: cleanText(
                `${partido.mt[0].local.name}-VS-${partido.mt[0].visitante.name}`
              ).replace(/ /g, '-'),
              id: partido.id,
            },
          }
      " class="column no-wrap q-mb-sm relative-position bg-white partido-container"
        v-for="(partido, i) in calendario?.partidos || []" :key="i">
        <div class="row no-wrap text-center items-center">
          <div class="column no-wrap col justify-center items-center q-py-sm q-gutter-xs">
            <img :alt="partido.mt[0].local.name" :src="`https://www.futbolecuador.com/${partido.mt[0].local.shield_big}`"
              width="25" height="25" loading="lazy" />
            <span class="text-caption text-blue-grey-6 text-bold">
              {{ partido.mt[0].local.short_name }}
            </span>
          </div>
          <div v-if="!!partido.result.length" class="q-pa-sm text-bold bg-accent text-white q-mr-md result-containter">
            {{ partido.result.split('-')[0] }}
          </div>
          <q-separator inset vertical color="accent" size="2px" />
          <div v-if="!!partido.result.length"
            class="q-pa-sm text-bold bg-accent text-white q-ml-md text-center result-containter">
            {{ partido.result.split('-')[1] }}
          </div>
          <div class="column no-wrap col justify-center items-center q-gutter-xs">
            <img :alt="partido.mt[0].visitante.name"
              :src="`https://www.futbolecuador.com/${partido.mt[0].visitante.shield_big}`" width="25" height="25"
              loading="lazy" />
            <span class="text-caption text-blue-grey-6 text-bold">{{
              partido.mt[0].visitante.short_name
            }}</span>
          </div>
        </div>
        <q-separator color="blue-grey-2" />
        <div class="row no-wrap q-pa-xs text-caption text-bold items-center" :class="{
          'justify-between bg-primary text-white text-right':
            partido.state > 0 && partido.state < 8,
          'text-center': partido.state == 0 || partido.state == 8,
        }">
          <div class="column no-wrap col" v-if="partido.state == 0">
            {{
              date.formatDate(partido.dm.replace(' ', 'T'), 'D-MM-YYYY | HH:mm')
            }}
            hs.
          </div>
          <div v-if="
            partido.state > 0 && partido.state < 8
          " class="row items-center">
            <q-icon name="circle" color="red" size="xs" class="q-mr-sm" />
            <span class="text-bold">EN DIRECTO</span>
          </div>
          <q-icon name="add" size="sm" v-else />

          <div class="column no-wrap col" v-if="partido.state == 1">
            PRIMER TIEMPO
          </div>
          <div class="column no-wrap col" v-else-if="partido.state == 2">
            FIN PRIMER TIEMPO
          </div>
          <div class="column no-wrap col" v-else-if="partido.state == 3">
            SEGUNDO TIEMPO
          </div>
          <div class="column no-wrap col" v-else-if="partido.state == 4">
            FIN SEGUNDO TIEMPO
          </div>
          <div class="column no-wrap col" v-else-if="partido.state == 5">
            PRIMER EXTRA
          </div>
          <div class="column no-wrap col" v-else-if="partido.state == 6">
            SEGUNDO EXTRA
          </div>
          <div class="column no-wrap col" v-else-if="partido.state == 7">
            PENALES
          </div>
          <div class="column no-wrap col text-red" v-else-if="partido.state == 8">
            FINALIZADO
          </div>
          <div class="column no-wrap col" v-else>
            {{
              date
                .formatDate(partido.dm.replace(' ', 'T'), 'dddd')
                ?.toUpperCase() ?? ''
            }}
          </div>
        </div>
      </router-link>
    </template>

    <CustomSkeleton v-else style="height: 1200px !important" />
  </div>
</template>

<style scoped lang="scss">
.partido-container {
  transition: 0.2s;
  background-color: white;
  border: 1px solid transparent;
}

.partido-container:hover {
  transition: 0.2s;
  background-color: $blue-grey-1 !important;
  border: 1px solid $blue-grey-2;
  border-radius: 2px;
}

.result-containter {
  border-radius: 100px;
  width: 30px;
  height: 30px;
  line-height: 15px;
}
</style>
