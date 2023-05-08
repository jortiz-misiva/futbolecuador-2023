<script setup lang="ts">
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';
import { debounce } from 'quasar';
import useGoogleTag from 'src/composables/useGoogletag';
import { toRefs, ref, onUnmounted, watch, onMounted } from 'vue';

const { pushAd, destroySlots, isSlotRendered } = useGoogleTag();

interface Props {
  adid: string;
  googleTag: string;
  minWidth?: string;
  minHeight?: string;
  arrSizes: [number, number][] | [number, number];
  dissmisable?: boolean;
  collapse?: boolean;
  test?: boolean;
  canShow?: boolean;
  view?: boolean;
  force?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: '100%',
  minHeight: '90px',
  dissmisable: false,
  test: false,
  collapse: true,
  canShow: false,
  view: false,
  force: false,
});

const {
  googleTag,
  adid,
  arrSizes,
  dissmisable,
  collapse,
  minHeight,
  minWidth,
  test,
  canShow,
  view,
  force,
} = toRefs(props);

const show = ref<boolean>(false);
const deleted = ref<boolean>(false);
const isIntersected = ref<boolean>(false);

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);

const debounceAd = debounce(() => {
  fireAd();
}, 200);

const canShowAd = () => {
  isSlotRendered([googleTag.value], () => {
    show.value = true;
  });
};

const fireAd = () => {
  if (process.env.SERVER || test.value) return;
  if (test.value || !adid.value) return;
  pushAd(googleTag.value, arrSizes.value, adid.value, collapse.value);
  if (canShow.value) canShowAd();
};

const onIntersection = (entry: IntersectionObserverEntry) => {
  if (!entry.isIntersecting) return;
  isIntersected.value = true;
  if (!view.value) return;
  debounceAd();
};

watch(showComponent, () => {
  if (
    (!showComponent.value && !force.value) ||
    (view.value && !isIntersected.value)
  )
    return;
  debounceAd();
});

onMounted(() => {
  if ((!showComponent.value && !force.value) || view.value) return;
  debounceAd();
});

onUnmounted(() => {
  destroySlots([googleTag.value]);
});
</script>

<template>
  <div
    v-intersection.once="onIntersection"
    v-if="!deleted"
    v-show="canShow ? show : true"
    class="column no-wrap justify-center items-center content-center relative-position"
    :class="{
      'bg-red': test,
    }"
  >
    <q-btn
      v-if="dissmisable"
      icon="close"
      class="absolute-top-left"
      dense
      round
      size="sm"
      unelevated
      text-color="black"
      color="white"
      style="width: 10px; height: 10px; z-index: 1; margin-top: -10px"
      @click="deleted = true"
    />

    <div
      class="column no-wrap"
      :id="adid"
      :style="{
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
      }"
    ></div>
  </div>
</template>
