<script setup lang="ts">
import SubMenu, { SubMenuItem } from './SubMenu.vue';
interface Props {
  links: {
    name: string;
    to?: string;
    img?: string;
    items?: SubMenuItem[];
  }[];
}
defineProps<Props>();
</script>

<template>
  <nav class="q-mx-xs row items-center">
    <SubMenu
      v-for="(link, i) in links"
      :key="i"
      :label="link.name"
      :to="link.to"
      :img="link.img"
      :items="link.items"
    />
  </nav>
</template>
