<script setup lang="ts">
import { debounce } from 'quasar';
import { ref, watch } from 'vue';

export interface SubMenuItem {
  to: string;
  label: string;
}

interface Props {
  label: string;
  to?: string;
  items?: SubMenuItem[];
  img?: string;
}

defineProps<Props>();

const showSubMenu = ref<boolean>(false);
const menuOver = ref<boolean>(false);
const listOver = ref<boolean>(false);

const checkMenu = () => {
  if (menuOver.value || listOver.value) {
    showSubMenu.value = true;
  } else {
    showSubMenu.value = false;
  }
};

const debounceFunc = debounce(() => {
  checkMenu();
}, 300);

watch(menuOver, () => {
  if (menuOver.value) showSubMenu.value = true;
  debounceFunc();
});

watch(listOver, () => {
  debounceFunc();
});
</script>

<template>
  <q-btn
    @mouseover="menuOver = true"
    @mouseleave="menuOver = false"
    no-caps
    unelevated
    no-wrap
    square
    type="a"
    padding="4px 0.25vw"
    :label="label"
    :to="to"
    :class="{
      active: to == $route.path || (items && items[0].to == $route.path),
    }"
  >
    <q-icon
      v-if="!!items?.length"
      right
      size="1em"
      name="expand_more"
      class="q-ml-xs"
    />
    <div v-else class="q-ml-xs"></div>
    <q-menu
      @mouseover="listOver = true"
      @mouseleave="listOver = false"
      v-model="showSubMenu"
      v-if="items"
      auto-close
      square
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-list
        style="min-width: 20vw"
        class="submenu-container position-absolute"
      >
        <q-img
          class="absolute-center fit background-image"
          :src="`/${img}`"
          fit="cover"
          no-spinner
          no-transition
          position="left"
        />
        <q-item
          clickable
          v-close-popup
          v-for="({ label, to }, i) in items"
          :key="i"
          :to="to"
          class="submenu-item"
          :class="{
            'submenu-item-active': $route.path == to,
          }"
        >
          <q-item-section>
            <div class="row no-wrap items-center q-gutter-x-sm">
              <q-separator
                class="submenu-item-indicator"
                :class="{
                  'submenu-item-indicator-active': $route.path == to,
                }"
                size="2px"
                color="primary"
              />
              <span> {{ label }}</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style lang="scss" scoped>
.background-image {
  z-index: 0;
}

.background-image::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  background: -moz-linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 0.1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ffffff",GradientType=1);
}
.submenu-container {
  padding: 24px 0px 34px 0px;
}
.submenu-item {
  color: $accent;
}

.submenu-item:hover {
  color: $primary;
  font-weight: bold;
}
.submenu-item:hover .submenu-item-indicator {
  width: 24px;
}

.submenu-item-indicator {
  transition: 0.3s;
  width: 0px;
}
.submenu-item-active {
  color: $primary;
  font-weight: bold;
}
.submenu-item-indicator-active {
  width: 24px;
}
nav a.active {
  border-bottom: 2px solid $accent;
}
nav a {
  border-bottom: 2px solid transparent;
}

nav a:hover {
  border-bottom: 2px solid $accent;
}
</style>
