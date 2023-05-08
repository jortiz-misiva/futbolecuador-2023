<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import useDomStore from './stores/dom';

const { initialize, destroy } = useDomStore();
onMounted(() => {
  initialize();
});

onUnmounted(() => {
  destroy();
});
</script>

<template>
  <router-view />
</template>
