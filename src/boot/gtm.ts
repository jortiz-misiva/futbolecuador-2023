import { boot } from 'quasar/wrappers';
import { createGtm } from '@gtm-support/vue-gtm';

export default boot(async ({ app, router }) => {
  app.use(
    createGtm({
      id: 'GTM-53XBQP',
      vueRouter: router,
    })
  );
});
