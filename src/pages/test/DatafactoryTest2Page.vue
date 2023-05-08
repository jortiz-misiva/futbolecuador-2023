<script setup lang="ts">
import DatafactoryWidget from '@/shared/components/datafactory/DatafactoryWidget.vue';
</script>

<template>
  <q-btn color="primary" label="ir a test" :to="{ name: 'test' }" />
  <DatafactoryWidget
    dt-class="dfMc-Page"
    channel="deportes.futbol.ecuador"
    data-type="page"
    data-name="posiciones"
  />
</template>
