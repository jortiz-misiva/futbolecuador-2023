<script setup lang="ts">
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import useGoogleTag from 'src/composables/useGoogletag';
import { toRefs, ref, onUnmounted, watch, onMounted } from 'vue';

const { pushAd, destroySlots, isSlotRendered } = useGoogleTag();

interface Props {
  adid: string;
  googleTag: string;
  minWidth?: string;
  minHeight?: string;
  arrSizes: [number, number][] | [number, number];
  collapse?: boolean;
  test?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: '100%',
  minHeight: '90px',
  dissmisable: false,
  test: false,
  collapse: true,
});

const { googleTag, adid, arrSizes, collapse, minHeight, minWidth, test } =
  toRefs(props);

const show = ref<boolean>(false);
const deleted = ref<boolean>(false);

const canShowPopup = () => {
  isSlotRendered([googleTag.value], () => {
    show.value = true;
  });
};

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);

const fireAd = () => {
  if (process.env.SERVER || test.value) return;
  if (test.value) return;
  if (!adid.value) return;
  pushAd(googleTag.value, arrSizes.value, adid.value, collapse.value);
  canShowPopup();
};

watch(showComponent, () => {
  if (!showComponent.value) return;
  fireAd();
});

onMounted(() => {
  if (!showComponent.value) return;
  fireAd();
});

onUnmounted(() => {
  destroySlots([googleTag.value]);
});
</script>

<template>
  <div
    v-if="!deleted"
    v-show="show"
    class="column no-wrap justify-center items-center content-center relative-position fixed-center pop-bg z-top fit"
    :class="{
      'bg-red': test,
    }"
  >
    <div
      class="row justify-end"
      :style="{
        minWidth: `${minWidth}px`,
      }"
    >
      <q-btn
        icon="close"
        class="q-ma-sm z-top"
        dense
        round
        size="sm"
        unelevated
        text-color="black"
        color="white"
        style="width: 10px; height: 10px; z-index: 1"
        @click="show = false"
      />
    </div>
    <div
      class="column no-wrap items-center"
      :id="adid"
      :style="{
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
      }"
    ></div>
  </div>
</template>

<style lang="scss">
.pop-bg {
  background-color: rgba(0, 15, 46, 0.3);
}
</style>
