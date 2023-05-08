import { defineStore } from 'pinia';
import { ref } from 'vue';
const useDrawerStore = defineStore('drawer', () => {
  const leftDrawerOpen = ref<boolean>(false);

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const isPrefech = ref<boolean>(false);

  return {
    toggleLeftDrawer,
    leftDrawerOpen,
    isPrefech,
  };
});

export default useDrawerStore;
