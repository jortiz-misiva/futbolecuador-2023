import { useQuasar } from 'quasar';
import { computed } from 'vue';

const useMediaQuery = () => {
  const $q = useQuasar();

  const isLandscape = computed(() => $q.screen.width > $q.screen.height);

  const isMobile = computed(() =>
    isLandscape.value
      ? $q.screen.width != 0 && $q.screen.lt.md
      : $q.screen.width != 0 &&
        $q.screen.lt.sm &&
        ($q.platform.is.mobile ?? false)
  );

  const isTablet = computed(
    () => $q.screen.width != 0 && $q.screen.gt.xs && $q.screen.lt.lg
  );

  const isDesktop = computed(() => $q.platform.is.desktop);

  const isTabletLandscape = computed(() => isTablet.value && isLandscape.value);

  const isTabletPortrait = computed(() => isTablet.value && !isLandscape.value);

  const isDesktopOrTablet = computed(() => isDesktop.value || isTablet.value);

  const isDesktopOrTabletLandscape = computed(
    () => isDesktop.value || isTabletLandscape.value
  );

  const isMobileOrTabletPortrait = computed(
    () => isMobile.value || isTabletPortrait.value
  );

  return {
    isLandscape,
    isTablet,
    isTabletLandscape,
    isTabletPortrait,
    isDesktopOrTablet,
    isDesktopOrTabletLandscape,
    isMobileOrTabletPortrait,
    isMobile,
    isDesktop,
  };
};

export default useMediaQuery;
