<script setup lang="ts">
import { footerMenuLinks } from '@/router/navbarlinks';
import { defineAsyncComponent } from 'vue';
const NavMenu = defineAsyncComponent(() => import('../header/NavMenu.vue'));
const LogoComponent = defineAsyncComponent(
  () => import('../LogoComponent.vue')
);
</script>

<template>
  <q-footer
    class="bg-primary column no-wrap items-center q-pa-md q-gutter-y-sm"
  >
    <LogoComponent width="305px" />
    <NavMenu :links="footerMenuLinks" />

    <q-toolbar>
      <nav class="full-width text-center">
        <ul class="row no-wrap q-pa-none q-mx-none q-mt-none justify-center">
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
      </nav>
    </q-toolbar>
    <div class="text-center q-pt-sm">© Copyright 2000-2023. futbolecuador</div>
  </q-footer>
</template>
