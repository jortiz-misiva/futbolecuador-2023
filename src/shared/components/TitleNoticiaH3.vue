<script setup lang="ts">
interface Props {
  title: string;
  isHeader?: boolean;
  dark?: boolean;
  fontSize?: string;
  threeLines?: boolean;
}
withDefaults(defineProps<Props>(), {
  isHeader: false,
  dark: false,
});
</script>

<template>
  <h3
    class="text-bold"
    :class="{
      'text-overflow-3': threeLines,
      'text-overflow-2': !isHeader && !threeLines,
      'text-white': dark,
    }"
    :style="{ fontSize: isHeader ? '26px' : fontSize }"
  >
    {{ title }}
  </h3>
</template>

<style lang="scss">
h3 {
  line-height: 1.8rem;
}

h3.text-bold.text-overflow-3 {
  line-height: 1.2rem;
}

h3.text-bold.text-overflow-2 {
  line-height: 1.2;
  margin: 0;
  font-size: 1.1rem;
}
</style>
