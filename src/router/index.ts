import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        if (
          to.name == 'categoria' ||
          to.name == 'tag' ||
          to.name?.toString().includes('noticiaAbierta')
        )
          return { top: 0, left: 0 };
        return savedPosition;
      } else {
        return { top: 0, left: 0 };
      }
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.afterEach((to) => {
    if (!to.name?.toString().includes('noticiaAbierta')) {
      document.querySelectorAll('[id^="vr-"]').forEach((e) => e.remove());
    }
  });

  Router.onError((err, to, from) => {
    console.log(
      `Erro al navegar de ${from.name?.toString()} a ${to.name?.toString()}`
    );
    console.log({ to, from, err });
  });

  return Router;
});
