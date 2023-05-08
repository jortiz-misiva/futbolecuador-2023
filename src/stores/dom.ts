import { defineStore } from 'pinia';
import { nextTick, ref } from 'vue';

// const pubAds = () => {
//   const script = document.createElement('script');
//   script.async = true;
//   script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
//   script.type = 'text/javascript';
//   document.head.appendChild(script);
// };

const insurAds = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.insurads.com/bootstrap/MBTWTMRP.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);
};

const taboola = () => {
  const script = document.createElement('script');
  script.innerHTML = `window._taboola = window._taboola || [];
  _taboola.push({ flush: true });`;
  script.type = 'text/javascript';
  document.body.appendChild(script);
};

const datafactory = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://datafactory.futbolecuador.com/html/v3/minapp/minApp.js';
  script.type = 'text/javascript';
  document.body.appendChild(script);
};

const pushwoosh = () => {
  const script = document.createElement('script');
  const scriptDl = document.createElement('script');
  script.async = true;
  script.src = '//cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js';
  script.type = 'text/javascript';

  scriptDl.type = 'text/javascript';
  scriptDl.innerHTML = `
  var Pushwoosh = Pushwoosh || [];

  Pushwoosh.push([
    'init',
    {
      logLevel: 'error',
      applicationCode: '0E44F-5F59B',
      safariWebsitePushID: 'web.com.futbolecuador.push',
      defaultNotificationTitle: 'futbolecuador.com',
      defaultNotificationImage:
        'https://www.futbolecuador.com/icon/futbolecuador-icon.png',
      autoSubscribe: true,
    },
  ]);

  Pushwoosh.push([
    'onLoad',
    function () {
      console.log('Pushwoosh load!');
    },
  ]);
  `;
  document.head.appendChild(script);
  document.head.appendChild(scriptDl);
};

const teads = () => {
  const scriptDl = document.createElement('script');
  const scriptTag = document.createElement('script');
  scriptTag.src = 'https://a.teads.tv/analytics/tag.js';
  scriptTag.async = true;
  scriptTag.type = 'text/javascript';

  scriptDl.type = 'text/javascript';
  scriptDl.innerHTML = `
  window.teads_analytics = window.teads_analytics || {};
  window.teads_analytics.analytics_tag_id = 'PUB_15480';
  window.teads_analytics.share =
    window.teads_analytics.share ||
    function () {
      (window.teads_analytics.shared_data =
        window.teads_analytics.shared_data || []).push(arguments);
    };`;
  scriptDl.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';

  document.head.appendChild(scriptTag);
  document.head.appendChild(scriptDl);
};

let scriptLoaded = false;

const scriptsToLoad = () => {
  if (scriptLoaded) return;
  pushwoosh();
  // pubAds();
  teads();
  taboola();
  insurAds();
  datafactory();
  scriptLoaded = true;
};

const useDomStore = defineStore('dom', () => {
  const loadAdScriptTimeout = setTimeout(async () => {
    if (process.env.SERVER) return;
    scriptsToLoad();
    showComponent.value = true;
    destroy();
  }, 8_000);

  const onFirstEvent = async () => {
    if (process.env.SERVER) return;
    await nextTick();
    scriptsToLoad();
    showComponent.value = true;
    destroy();
    clearTimeout(loadAdScriptTimeout);
  };

  const initialize = () => {
    window.addEventListener('scroll', onFirstEvent);
    window.addEventListener('click', onFirstEvent);
    window.addEventListener('touchstart', onFirstEvent);
  };

  const destroy = () => {
    window.removeEventListener('scroll', onFirstEvent);
    window.removeEventListener('click', onFirstEvent);
    window.removeEventListener('touchstart', onFirstEvent);
  };

  const showComponent = ref<boolean>(false);

  return {
    showComponent,
    initialize,
    destroy,
  };
});

export default useDomStore;
