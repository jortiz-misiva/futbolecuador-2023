<script setup lang="ts">
// import ScriptTag from '../ScriptTag.vue';
import SpinnerDots from '../SpinnerDots.vue';
interface Props {
  channel: string;
  dataType: string;
  dataName: string;
  dtClass?: string;
  dataSettings?: { [key: string]: string };
}
const props = withDefaults(defineProps<Props>(), {
  dtClass: '',
});
const dataEvent = `{"channel": "${props.channel}"}`;
</script>

<template>
  <div
    :class="'mc-injectContainer ' + dtClass"
    :data-event="dataEvent"
    :data-type="dataType"
    :data-name="dataName"
    :data-settings="dataSettings || {}"
  >
    <SpinnerDots />
  </div>
  <!-- <ScriptTag
    id="datafactory"
    src="https://datafactory.futbolecuador.com/html/v3/minapp/minApp.js"
  >
  </ScriptTag> -->
</template>
