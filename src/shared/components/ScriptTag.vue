<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  id?: string;
  src?: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
  dataWid?: string;
  customclass?: string;
}

const props = defineProps<Props>();

const scriptRef = ref<HTMLElement>();

onMounted(() => {
  const script = document.createElement('script');

  const setScriptAttribute = (key: string, value: string | boolean) => {
    if (value === undefined) return;

    if (key === 'async' || key === 'defer') {
      script[key] = value as boolean;
    } else {
      script.setAttribute(key, value as string);
    }
  };

  Object.entries(props).forEach(([key, value]) => {
    setScriptAttribute(key, value);
  });

  script.innerHTML = scriptRef.value?.innerHTML ?? '';

  scriptRef.value?.replaceWith(script);
});
</script>

<template>
  <div ref="scriptRef">
    <slot></slot>
  </div>
</template>
