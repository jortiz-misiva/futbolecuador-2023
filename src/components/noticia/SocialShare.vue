<script setup lang="ts">
import { ref, onMounted } from 'vue';

const socialShares = {
  facebook: 'fa-brands fa-facebook',
  twitter: 'fa-brands fa-twitter',
  whatsapp: 'fa-brands fa-whatsapp',
};

const url = ref<string>('');
const title = ref<string>('');

onMounted(() => {
  url.value = window.location.href;
  title.value = document.title;
});
</script>

<template>
  <section class="row items-center justify-center">
    <div class="q-pr-sm text-subtitle1">Compartir:</div>
    <div
      class="share-container relative-position"
      v-for="(social, key, i) in socialShares"
      :key="i"
    >
      <ShareNetwork
        class="share-btn absolute-center"
        v-ripple
        label="hola"
        :network="key"
        :url="url"
        :title="title"
      >
        <q-icon :name="social" size="xs" class="absolute-center" />
      </ShareNetwork>
    </div>
  </section>
</template>

<style lang="scss">
.share-btn {
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.share-container {
  background-color: $primary;
  color: white;
  border-radius: 30px;
  margin: 0px 4px;
  width: 40px;
  height: 40px;
}
</style>
