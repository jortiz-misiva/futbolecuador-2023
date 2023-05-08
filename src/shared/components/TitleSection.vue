<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <h4
    v-memo="[title]"
    class="bg-primary-gradient q-px-md q-py-sm text-bold text-white"
    style="font-size: 18px"
  >
    {{ title }}
  </h4>
</template>
