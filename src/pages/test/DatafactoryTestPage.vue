<script setup lang="ts">
import DatafactoryWidget from '@/shared/components/datafactory/DatafactoryWidget.vue';
</script>

<template>
  <q-btn color="primary" label="ir a test 2" :to="{ name: 'test2' }" />
  <DatafactoryWidget
    dt-class="dfMc-Agenda"
    channel="deportes.futbol.ecuador"
    data-type="page"
    data-name="agenda_vertical"
  />
</template>
