<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';

interface Props {
  videoId?: string;
  source?: 'dugout' | 'fcp';
  test?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  source: 'dugout',
  videoId: 'eyJrZXkiOiIiLCJwIjoiZnV0Ym9sZWN1YWRvciIsInBsIjoia0VZQVFvZmwifQ==',
  test: false,
});

const { videoId, source } = toRefs(props);

const videoAdElement = ref<HTMLDivElement>();

onMounted(() => {
  if (process.env.SERVER || props.test) return;

  const script = document.createElement('script');
  script.defer = true;
  script.type = 'text/javascript';

  if (source.value == 'dugout') {
    script.src = 'https://embed.dugout.com/v3.1/futbolecuador.js';
  }

  if (source.value == 'fcp') {
    script.src =
      'https://fcp.codes/embed-code-template/embed-code-template.js#' +
      videoId.value;
  }

  videoAdElement.value?.appendChild(script);
});
</script>

<template>
  <div class="q-pa-md bg-white" style="width: 100%">
    <div
      ref="videoAdElement"
      v-once
      :id="videoId"
      :class="
        source != 'dugout' ? videoId : 'dugout-video dugout-embed-' + videoId
      "
      class="video-ad"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.video-ad {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  min-height: 185px;
}
</style>
