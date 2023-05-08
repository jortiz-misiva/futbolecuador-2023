<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import useMediaQuery from '@/composables/useMediaQuery';
import { menuLinks } from '@/router/navbarlinks';
import useDrawerStore from '@/stores/drawer';

const LogoComponent = defineAsyncComponent(
  () => import('../LogoComponent.vue')
);
const SearchBar = defineAsyncComponent(() => import('../search/SearchBar.vue'));
const NavMenu = defineAsyncComponent(() => import('./NavMenu.vue'));

const showSearch = ref<boolean>(false);

const { isDesktopOrTablet } = useMediaQuery();

const { toggleLeftDrawer } = useDrawerStore();
const drawer = useDrawerStore();
</script>

<template>
  <q-header v-once class="bg-primary-gradient q-py-sm" reveal>
    <q-toolbar class="row no-wrap">
      <LogoComponent :width="isDesktopOrTablet ? '250px' : undefined" />
      <NavMenu class="gt-sm" :links="menuLinks" />
      <q-space />
      <div class="row no-wrap q-gutter-x-sm">
        <q-btn
          no-caps
          dense
          flat
          icon="sensors"
          label="Resultados"
          :to="{ name: 'resultados' }"
        />

        <div class="row no-wrap q-gutter-x-sm" v-if="isDesktopOrTablet">
          <q-separator color="accent" vertical inset />
          <q-btn
            class="gt-sm"
            round
            no-caps
            dense
            flat
            icon="search"
            @click="showSearch = true"
          />
          <q-btn
            class="lt-md"
            round
            no-caps
            dense
            flat
            icon="menu"
            @click="toggleLeftDrawer()"
          />
        </div>
      </div>
    </q-toolbar>
    <q-linear-progress
      v-if="drawer.isPrefech"
      indeterminate
      color="accent"
      rounded
      class="full-width absolute-bottom"
    />
  </q-header>

  <q-dialog v-model="showSearch">
    <q-card>
      <q-card-section class="column" style="width: 400px">
        <SearchBar
          :dark="false"
          :fixed-top="false"
          @on-enter="showSearch = false"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
