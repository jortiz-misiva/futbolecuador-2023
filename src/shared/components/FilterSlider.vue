<script setup lang="ts">
import useMediaQuery from '@/composables/useMediaQuery';
import { onMounted, ref } from 'vue';

export interface Chip {
  icon?: string;
  name?: string;
  value: string;
  tag?: string;
}

interface Props {
  chips: Chip[];
  selected?: string;
  dark?: boolean;
  noScroll?: boolean;
}

interface Emits {
  (event: 'onTap', value: string, tag?: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  dark: false,
});

const emits = defineEmits<Emits>();

onMounted(() => {
  setSelectedItemScroll();
});

const scrollContainer = ref<HTMLDivElement>();

const setSelectedItemScroll = (value?: string, tag?: string) => {
  if (value) emits('onTap', value, tag);
  if (props.chips.length <= 3) return;

  setTimeout(() => {
    const selectedItem = document.querySelector(
      '.scroll-container .selected-item'
    ) as HTMLDivElement | undefined;

    if (scrollContainer.value) {
      const scrollLeft =
        (selectedItem?.offsetLeft ?? 0) - scrollContainer.value.offsetLeft - 14;
      scrollContainer.value.scrollLeft = scrollLeft;
    }
  }, 100);
};

const { isDesktop } = useMediaQuery();
</script>

<template>
  <div
    ref="scrollContainer"
    class="row q-py-sm q-gutter-x-sm scroll-container"
    :class="{
      'bg-primary-gradient': dark,
      'no-wrap scroll': !noScroll,
      'justify-center': noScroll,
    }"
  >
    <q-btn
      :size="isDesktop ? '0.75rem' : '1rem'"
      v-for="({ name, value, icon, tag }, i) in chips"
      no-wrap
      no-caps
      unelevated
      rounded
      class="text-bold"
      :icon="icon"
      :class="{
        'q-ml-md': i == 0 && !noScroll,
        'selected-item': selected == value,
        'bg-accent': selected == value && dark,
        'bg-blue-grey-2': selected == value && !dark,
        'text-white': selected != value && dark,
        'col col-xs-2 col-sm-2 col-md-1 col-lg-2 justify-center': noScroll,
      }"
      :color="dark ? 'accent' : undefined"
      :flat="selected != value"
      :dark="dark"
      :key="i"
      :label="name"
      :clickable="selected != value"
      @click="selected != value ? setSelectedItemScroll(value, tag) : undefined"
    />
  </div>
</template>

<style scoped lang="scss">
.scroll-container::-webkit-scrollbar {
  transition: 0.2s;
  height: 10px;
  background-color: #e0e0e0;
}

.scroll-container::-webkit-scrollbar-thumb {
  transition: 0.2s;
  background-color: rgba($color: $accent, $alpha: 0.2);
  border-radius: 100px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  transition: 0.2s;
  background-color: $accent;
  border-radius: 100px;
}

.scroll-container {
  transition: 0.2s;
  scroll-behavior: smooth;
  transition: scroll-behavior 0.3s ease-in-out;
  scrollbar-width: thin;
  scrollbar-color: $accent #e0e0e0;
}
</style>
