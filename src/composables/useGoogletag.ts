const existSlots = (slotsPaths: string[]): googletag.Slot[] | undefined => {
  const slots = googletag.pubads().getSlots();
  if (!slots) return;
  const slotToFind = slots.filter((s) => {
    for (const slot of slotsPaths) {
      if (s.getAdUnitPath().includes(slot)) {
        return slot;
      }
    }
  });

  return slotToFind;
};

const useGoogleTag = () => {
  const destroySlots = (slotsPaths?: string[]) => {
    if (process.env.SERVER) return;
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(() => {
      if (slotsPaths) {
        const slotToFind = existSlots(slotsPaths);
        if (!slotToFind?.length) return;
        googletag.destroySlots(slotToFind);
      } else {
        googletag.destroySlots();
      }
    });
  };

  const pushAd = (
    path: string,
    sizes: [number, number][] | [number, number],
    id: string,
    collapse: boolean
  ) => {
    if (process.env.SERVER) return;
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      // const slotToFind = existSlots([path]);
      // if (!!slotToFind?.length) return;
      googletag.defineSlot(path, sizes, id)?.addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      if (collapse) googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
      googletag.display(id);

      console.log('Mostrando ad', path);
    });
  };

  const refresh = async (slotsPaths?: string[]) => {
    if (process.env.SERVER) return;
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      if (slotsPaths) {
        const slotToFind = existSlots(slotsPaths);
        if (!slotToFind?.length) return;
        googletag.pubads().refresh(slotToFind);
      } else {
        googletag.pubads().refresh();
      }
    });
  };

  const isSlotRendered = async (slotsPaths: string[], callBack: () => void) => {
    if (process.env.SERVER) return;
    window.googletag = window.googletag || { cmd: [] };
    const slotToFind = existSlots(slotsPaths);
    if (slotToFind) {
      const AdSlot = slotToFind[0];
      const onSlotRenderEnded = (
        event: googletag.events.SlotRenderEndedEvent
      ) => {
        if (event.slot === AdSlot && !event.isEmpty) {
          callBack();
          googletag
            .pubads()
            .removeEventListener('slotRenderEnded', onSlotRenderEnded);
        }
      };

      googletag.pubads().addEventListener('slotRenderEnded', onSlotRenderEnded);
    }
  };

  return {
    pushAd,
    refresh,
    destroySlots,
    isSlotRendered,
  };
};

export default useGoogleTag;
