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
  <h4
    class="text-bold"
    :class="{
      'text-overflow-3': threeLines,
      'text-overflow-2': !isHeader && !threeLines,
      'text-white': dark,
    }"
    :style="{ fontSize: isHeader ? '26px' : fontSize }"
  >
    {{ title }}
  </h4>
</template>

<style lang="scss">
h4 {
  line-height: 1.8rem;
}

h4.text-bold.text-overflow-3 {
  line-height: 1.2rem;
}

h4.text-bold.text-overflow-2 {
  line-height: 1.2;
  margin: 0;
  font-size: 1.1rem;
}
</style>
