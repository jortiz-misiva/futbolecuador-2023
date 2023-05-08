<script setup lang="ts">
import { IframeHTMLAttributes, onMounted, onUpdated } from 'vue';
import useMediaQuery from '@/composables/useMediaQuery';
import ScriptTag from '@/shared/components/ScriptTag.vue';
import { NoticiaAbierta } from 'src/interfaces/story';
import AdComponent from '@/shared/components/ads/AdComponent.vue';
import useDomStore from '@/stores/dom';
import { storeToRefs } from 'pinia';

interface Props {
  noticia: NoticiaAbierta;
}

defineProps<Props>();

const { isMobile } = useMediaQuery();

const fixes = () => {
  const instagram = document.querySelectorAll('.instagram-media');

  if (instagram.length) {
    const script = document.createElement('script');
    script.defer = true;
    script.id = 'instagramEmbed';
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
    window.instgrm.Embeds.process();
  }

  const iframes = document.querySelectorAll('#body-content iframe');
  iframes.forEach(function (e) {
    const iframEl = e as IframeHTMLAttributes;

    if (iframEl.src?.startsWith('https://embed.dugout.com/v2/')) {
      const embedId = iframEl.src?.split('?p=')[1];
      const el = document.createElement('div');
      el.className = 'dugout-video dugout-embed-' + embedId;
      el.setAttribute('style', 'width: 100%; overflow: hidden;');
      e.parentElement?.appendChild(el);

      const script = document.createElement('script');
      script.defer = true;
      script.type = 'text/javascript';
      script.src = 'https://embed.dugout.com/v3.1/futbolecuador.js';
      e.parentElement?.appendChild(script);
      e.parentElement?.removeChild(e);
    }
  });

  const scripts = document.querySelectorAll('#body-content script');
  scripts.forEach(function (e) {
    e.parentElement?.removeChild(e);
  });

  const twitterWidget = document.querySelector('.twitter-tweet');
  if (!twitterWidget) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://platform.twitter.com/widgets.js';
  twitterWidget.appendChild(script);
};

onUpdated(() => {
  setTimeout(() => {
    fixes();
  }, 100);
});

onMounted(() => {
  setTimeout(() => {
    fixes();
  }, 100);
});

const domStore = useDomStore();
const { showComponent } = storeToRefs(domStore);
</script>

<template>
  <section class="column no-wrap">
    <ScriptTag
      customclass="teads"
      src="//a.teads.tv/page/92308/tag"
      async
      type="text/javascript"
    />
    <div
      id="lead-content"
      class="text-body bg-white q-px-md q-py-sm"
      v-html="noticia.lead"
    ></div>

    <AdComponent
      v-if="isMobile"
      adid="div-gpt-ad-1659049166967-0"
      google-tag="/1022247/VideoWall_Mobile"
      :arr-sizes="[300, 600]"
      min-width="300"
      min-height="600"
      class="q-py-sm"
    />
    <div
      id="body-content"
      class="text-body relative-position bg-white q-px-md q-py-sm"
      v-html="noticia.body"
    ></div>
    <ScriptTag
      async
      src="https://static.solutionshindsight.net/teju-webclient/teju-webclient.min.js"
    />

    <template v-if="showComponent">
      <div
        class="q-pa-md bg-white"
        v-if="noticia.widget"
        v-html="noticia.widget"
      ></div>
    </template>
  </section>
</template>

<style lang="scss">
#body-content iframe,
#lead-content iframe {
  width: 100% !important;
}

#body-content img,
#lead-content img {
  width: 100% !important;
  height: max-content !important;
}

#body-content,
#lead-content {
  font-size: large;
  line-height: 1.5;
}

#lead-content a,
#body-content a {
  color: dodgerblue;
  text-decoration: underline;
}
#lead-content a:hover,
#body-content a:hover {
  color: deepskyblue;
}
</style>
