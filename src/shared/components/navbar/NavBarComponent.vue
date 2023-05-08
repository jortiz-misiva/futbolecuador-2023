<script setup lang="ts">
import { navLinks } from 'src/router/navbarlinks';
import { defineAsyncComponent } from 'vue';
const NavBarItemComponent = defineAsyncComponent(
  () => import('./NavBarItemComponent.vue')
);
const links = navLinks;
</script>

<template>
  <q-toolbar>
    <nav class="full-width">
      <ul class="row no-wrap q-pa-none q-mx-none q-mt-none">
        <li
          style="list-style: none; width: 20%"
          v-for="(link, i) in links"
          :key="i"
        >
          <NavBarItemComponent
            :active-icon="link.activeIcon"
            :icon="link.icon"
            :label="link.name"
            :to="link.to"
            :is-drawer="link.isDrawer"
          />
        </li>
      </ul>
    </nav>
  </q-toolbar>
</template>
