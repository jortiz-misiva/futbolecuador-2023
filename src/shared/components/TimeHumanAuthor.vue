<script setup lang="ts">
import { Category } from '@/interfaces/story';
import { formatTime } from 'src/shared/helpers/functions';
interface Props {
  time: string;
  category?: Category;
}
defineProps<Props>();
</script>

<template>
  <div
    :class="{ 'text-overflow-1': $q.platform.is.mobile }"
    class="text-weight-light"
  >
    <q-icon name="schedule" class="q-mr-xs" />
    <span class="format-time">{{ formatTime(time) }}</span>

    <q-chip
      clickable
      v-if="category"
      class="q-ml-sm text-bold text-white"
      no-caps
      size="sm"
      rounded
      unelevated
      color="primary"
      :label="category?.name"
      @click.prevent="
        $router.push({
          name: 'categoria',
          params: { term: category?.['slug-categoria'] },
        })
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.format-time {
  font-size: 0.8rem;
}
</style>
