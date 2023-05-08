<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
}

withDefaults(defineProps<Props>(), {
  width: '200px',
  height: '32px',
});
</script>

<template>
  <router-link :to="{ name: 'inicio' }">
    <img
      fit="contain"
      loading="eager"
      src="~assets/logo.webp"
      alt="futbolecuador.com"
      :style="{
        width,
        height,
      }"
  /></router-link>
</template>

<style scoped lang="scss">
img {
  object-fit: contain;
}
</style>
