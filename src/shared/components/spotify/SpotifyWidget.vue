<script setup lang="ts">
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

withDefaults(
  defineProps<{
    size?: 'normal' | 'compact';
    width?: string;
    test?: boolean;
  }>(),
  {
    size: 'compact',
    width: '100%',
    test: false,
  }
);
</script>

<template>
  <iframe
    v-if="!test"
    style="border-radius: 12px"
    data-src="https://open.spotify.com/embed/show/15K9B6kRjWSJgZGMofO6vs?utm_source=generator"
    :width="width"
    :height="size == 'normal' ? '352' : '152'"
    frameBorder="0"
    allowfullscreen="true"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    class="q-px-sm lazyload"
  ></iframe>
</template>
