import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'inicio',
        component: () => import('@/pages/IndexPage.vue'),
      },
      {
        path: '/posiciones',
        name: 'posiciones',
        component: () => import('@/pages/TablaDePosicionesPage.vue'),
      },
      {
        path: '/calendario',
        name: 'calendario',
        component: () => import('@/pages/CalendarioPage.vue'),
      },
      {
        path: '/videos',
        name: 'videos',
        component: () => import('@/pages/VideosPage.vue'),
      },
      {
        path: '/resultados',
        name: 'resultados',
        component: () => import('@/pages/ResultadosPage.vue'),
      },
      {
        path: '/serie-a',
        name: 'serie-a',
        props: {
          name: 'Serie A',
          term: 'serie-a',
          type: 'tag',
        },
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        path: '/serie-b',
        name: 'serie-b',
        props: {
          name: 'Serie B',
          term: 'serie-b',
          type: 'tag',
        },
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        path: '/copa-libertadores',
        name: 'copa-libertadores',
        props: {
          name: 'Copa Libertadores',
          term: 'copa-libertadores',
          type: 'tag',
        },
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        path: '/copa-sudamericana',
        name: 'copa-sudamericana',
        props: {
          name: 'Copa Sudamericana',
          term: 'copa-sudamericana',
          type: 'tag',
        },
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        path: '/eliminatorias',
        name: 'eliminatorias',
        props: {
          name: 'Eliminatorias',
          term: 'eliminatorias',
          type: 'tag',
        },
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        path: '/tabla-de-posiciones',
        component: () => import('@/pages/TorneosPage.vue'),
        children: [
          {
            path: ':id',
            component: () => import('@/pages/TorneosPage.vue'),
          },
        ],
      },

      {
        name: 'tag',
        path: '/etiqueta/:term',
        // redirect: '/',
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        name: 'categoria',
        path: '/categoria/:term',
        component: () => import('@/pages/CaTagPage.vue'),
      },
      {
        name: 'author',
        path: '/autor/:nick',
        component: () => import('@/pages/AuthorPage.vue'),
      },
      {
        name: 'search',
        path: '/buscar/:term',
        component: () => import('@/pages/SearchPage.vue'),
      },
      {
        name: 'test',
        path: '/test1',
        component: () => import('@/pages/test/DatafactoryTestPage.vue'),
      },
      {
        name: 'test2',
        path: '/test2',
        component: () => import('@/pages/test/DatafactoryTest2Page.vue'),
      },
      {
        name: 'noticiaAbiertaOld',
        path: '/site/noticia/:title/:id',
        component: () => import('@/pages/NoticiaPage.vue'),
      },
      {
        path: '/partido',
        children: [
          {
            name: 'partidoDetalle',
            path: 'detalle/:titulo/:id',
            component: () => import('@/pages/DetallePartido.vue'),
          },
          {
            name: 'partido',
            path: ':titulo/:id',
            component: () => import('@/pages/GameCastPage.vue'),
          },
        ],
      },
      {
        path: '/torneos',
        name: 'torneos',
        component: () => import('@/pages/TorneosPage.vue'),
        children: [
          {
            path: ':torneo',
            component: () => import('@/pages/TorneosPage.vue'),
          },
          {
            path: ':torneo/:submenu',
            component: () => import('@/pages/TorneosPage.vue'),
          },
        ],
      },
      {
        name: 'noticiaAbierta',
        path: '/:title/:id',
        redirect(to) {
          const { title, id } = to.params;
          return {
            name: 'noticiaAbiertaOld',
            params: {
              title,
              id,
            },
          };
        },
        // component: () => import('@/pages/NoticiaPage.vue'),
      },
    ],
  },

  {
    path: '/widgets',
    children: [
      {
        path: 'calendario',
        component: () => import('@/pages/widgets/CalendarWidgetPage.vue'),
      },
      {
        path: 'posiciones',
        component: () =>
          import('@/pages/widgets/TablaPosicionesWidgetPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect(to) {
      if (
        to.path.includes('/en-vivo') ||
        to.path.includes('/en-vivo-y-en-directo') ||
        to.path.includes('/marcadorenvivo')
      ) {
        return {
          name: 'resultados',
        };
      }

      if (to.path.includes('/tags')) {
        const params = to.path.replace('/', '').split('/');
        const term = params[params.length - 1];
        return {
          name: 'tag',
          params: {
            term,
          },
        };
      }
      return '/';
    },
  },
];

export default routes;
