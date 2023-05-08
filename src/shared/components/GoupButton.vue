<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const scrollToTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const show = ref<boolean>(false);

const eventListener = () => {
  const porcentaje = Math.round(
    (window.scrollY / document.body.scrollHeight) * 100
  );

  if (porcentaje > 10) show.value = true;
  else show.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', eventListener);
});

onUnmounted(() => {
  window.removeEventListener('scroll', eventListener);
});
</script>

<template>
  <transition
    appear
    enter-active-class="animated backInUp"
    leave-active-class="animated backOutDown"
  >
    <q-btn
      v-show="show"
      unelevated
      class="fixed-bottom-right z-top"
      dense
      rounded
      color="accent"
      icon="expand_less"
      @click="scrollToTop"
      style="right: 24px; bottom: 24px"
    />
  </transition>
</template>
