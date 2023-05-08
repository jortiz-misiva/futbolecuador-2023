<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useDrawerStore from 'src/stores/drawer';
import { sideMenuLinks } from 'src/router/navbarlinks';
import { defineAsyncComponent } from 'vue';

const SearchBar = defineAsyncComponent(() => import('../search/SearchBar.vue'));
const drawerStore = useDrawerStore();
const { leftDrawerOpen } = storeToRefs(drawerStore);
</script>

<template>
  <q-drawer
    v-model="leftDrawerOpen"
    side="right"
    overlay
    behavior="mobile"
    dark
    elevated
  >
    <q-toolbar>
      <SearchBar />
    </q-toolbar>
    <q-scroll-area style="width: 100%; height: 80%; margin-bottom: 120px">
      <q-list separator dark class="q-mx-md">
        <q-item
          v-for="(link, i) in sideMenuLinks"
          v-ripple="{ color: 'accent' }"
          :key="i"
          :to="link.to"
          clickable
          active-class="bg-accent"
          class="q-px-none"
        >
          <q-item-section class="q-py-sm q-px-xs" style="font-size: 18px">{{
            link.name
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <div class="column bg-secondary q-py-md absolute-bottom">
      <div
        class="text-center q-py-lg"
        style="padding-top: 0; padding-bottom: 0"
      >
        <ul
          class="row no-wrap q-pa-none q-mx-none q-mt-none justify-center"
          style="margin-bottom: 0"
        >
          <li
            style="
              list-style: none;
              width: 25px;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <a
              href="https://www.facebook.com/futbolecuador/"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-facebook" style="font-size: 20px"></i>
            </a>
          </li>

          <li
            style="
              list-style: none;
              width: 25px;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <a
              href="https://twitter.com/futbolecuador"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-twitter" style="font-size: 20px"></i>
            </a>
          </li>

          <li
            style="
              list-style: none;
              width: 25px;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <a
              href="https://www.instagram.com/futbolecuadorcom/"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-instagram" style="font-size: 20px"></i>
            </a>
          </li>

          <li
            style="
              list-style: none;
              width: 25px;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <a
              href="https://open.spotify.com/show/15K9B6kRjWSJgZGMofO6vs?"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-spotify" style="font-size: 20px"></i>
            </a>
          </li>

          <li
            style="
              list-style: none;
              width: 25px;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <a
              href="https://www.twitch.tv/futbolecuadorcom"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-twitch" style="font-size: 20px"></i>
            </a>
          </li>
        </ul>
      </div>

      <div class="text-center q-py-lg">
        © Copyright 2000-2023. futbolecuador
      </div>
    </div>
    <div
      v-if="leftDrawerOpen"
      class="q-drawer-hide absolute"
      style="top: 1vh; left: -70px; z-index: 1"
    >
      <q-btn
        flat
        round
        unelevated
        icon="close"
        size="xl"
        @click="drawerStore.toggleLeftDrawer()"
      />
    </div>
  </q-drawer>
</template>
