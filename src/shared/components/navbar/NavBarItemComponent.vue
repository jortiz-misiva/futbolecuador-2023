<script setup lang="ts">
import useDrawerStore from 'src/stores/drawer';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface Props {
  icon?: string;
  activeIcon?: string;
  label?: string;
  to?: string;
  isDrawer?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  to: '/',
  activeIcon: 'fa-solid fa-house',
  icon: 'fa-solid fa-house',
  label: 'Item',
  isDrawer: false,
});

const route = useRoute();
const { toggleLeftDrawer } = useDrawerStore();

const isActive = computed(() => route.name == props.to);
</script>

<template>
  <router-link
    :to="{ name: to }"
    v-ripple="{ color: 'primary' }"
    class="relative-position column items-center q-py-sm text-primary"
    @click="isDrawer ? toggleLeftDrawer() : undefined"
  >
    <div class="normal" :class="{ 'active-icon': isActive || isDrawer }">
      <q-icon :name="isActive ? activeIcon : icon" size="sm" />
    </div>
    <div
      class="text-caption text-center q-pt-xs"
      style="line-height: 1.2; font-size: 10px"
      :class="{ 'active-label': isActive || isDrawer }"
    >
      {{ label }}
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.normal {
  color: $accent;
  padding: 6px;
  text-align: center;
  width: 50%;
  transition: 0.3s;
  z-index: 1;
}

.active-icon {
  padding: 6px;
  // border-radius: 30px;
  text-align: center;
  color: $primary;
  width: 95%;
  // background-color: #0f324d;
  // box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

// .active-label {
//   color: $accent;
// }
</style>
