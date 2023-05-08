<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  if (window.FB) {
    window.FB.XFBML.parse();
    return;
  }
  const scripts = document.querySelectorAll(
    'script[src^="https://connect.facebook.net/es_LA/sdk."]'
  );

  if (scripts.length > 0) return;

  const script = document.createElement('script');

  script.crossOrigin = 'anonymous';
  script.src =
    'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v15.0&appId=95479719010&autoLogAppEvents=1';
  script.nonce = '0sPAcQIq';

  document.getElementById('body-content')?.parentElement?.appendChild(script);
});
</script>

<template>
  <div
    class="fb-comments text-center bg-white"
    :data-href="'https://futbolecuador.com' + route.fullPath"
    data-width="100%"
    data-numposts="5"
    data-colorscheme="light"
  >
    Cargando comentarios...
  </div>
</template>
