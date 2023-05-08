import { MetaOptions } from 'quasar/dist/types/meta';

export const indexMetaData: MetaOptions = {
  title: 'Lo mejor del fútbol ecuatoriano - Noticias, Partidos y Resultados',
  meta: {
    keywords: {
      name: 'keywords',
      content:
        'futbolecuador, www.futbolecuador.com, futbol ecuador, futbol ecuador lo mejor del futbol ecuatoriano, ecuagol, emelec, futbol, liga de quito,fef,la tri, seleccion ecuatoriana,campeonato ecuatoriano de futbol 2023, futbol ecuatoriano,tabla de posiciones, ldu,Barcelona,radio la red,aucas,campeonato ecuatoriano de futbol,deportivo quito,pervis estupiñán,piero hincapie,gonzalo plata,damián díaz,félix sánchez bas,jeremy sarmiento,miguel parrales,club deportivo el nacional,deportes ecuador,deportivo cuenca,bsc, independiente del valle, idv, orense, antonio valencia,ecuador futbol,futbol de ecuador,futbolecuador.com, campeonato ecuatoriano de futbol 2023 serie b,futbol ecuador en vivo,moisés caicedo,fut,seleccion de ecuador,ecuatorianos en el exterior, libertadores, sudamericana, Kendry Páez ',
    },
    description: {
      name: 'description',
      content:
        'Fútbol Ecuador: Las  mejores noticias e información sobre campeonato ecuatoriano, Clubes, Jugadores, Eliminatorias Mundial 2026, Libertadores, Sudamericana',
    },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    ogTitle: {
      property: 'og:title',
      content: 'futbolecuador.com',
    },
    ogDescription: {
      property: 'og:description',
      content:
        'Fútbol Ecuador: Las  mejores noticias e información sobre campeonato ecuatoriano, Clubes, Jugadores, Eliminatorias Mundial 2026, Libertadores, Sudamericana',
    },
    ogUrl: {
      property: 'og:url',
      content: 'https://futbolecuador.com',
    },
    ogImage: {
      property: 'og:image',
      content: 'https://www.futbolecuador.com/imagenes/coverappalertas.jpg',
    },
    ogType: {
      property: 'og:type',
      content: 'website',
    },
    ogLocale: {
      property: 'og:locale',
      content: 'es_ES',
    },
    twCard: {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    twSite: {
      property: 'twitter:site',
      content: '@futbolecuador',
    },
    twTitle: {
      property: 'twitter:title',
      content:
        'Lo mejor del fútbol ecuatoriano - Noticias, Partidos y Resultados',
    },
    twUrl: {
      property: 'twitter:url',
      content: 'https://www.futbolecuador.com',
    },
    twDescripption: {
      property: 'twitter:description',
      content:
        'Fútbol Ecuador: Las  mejores noticias e información sobre campeonato ecuatoriano, Clubes, Jugadores, Eliminatorias Mundial 2026, Libertadores, Sudamericana',
    },
    twImagen: {
      property: 'twitter:image',
      content: 'https://www.futbolecuador.com/imagenes/coverappalertas.jpg',
    },
  },
  script: {
    schema: {
      type: 'application/ld+json',
      innerHTML: `[{
        "@context":"https://schema.org",
        "@type":"WebSite",
        "@id":"https://www.futbolecuador.com",
        "headline":"futbolecuador.com",
        "name":"futbolecuador.com",
        "description":"Fútbol Ecuador: Las  mejores noticias e información sobre campeonato ecuatoriano, Clubes, Jugadores, Eliminatorias Mundial 2026, Libertadores, Sudamericana",
         "url":"https://www.futbolecuador.com",
         "potentialAction":{
           "@type":"SearchAction",
           "target":"https://www.futbolecuador.com/buscar/{search_term_string}",
           "query-input":"required name=search_term_string"
         }
       },{
          "@context":"https://schema.org/",
          "@type":"Organization",
          "@id":"https://www.futbolecuador.com#Organization",
          "name":"futbolecuador.com",
          "url":"https://www.futbolecuador.com",
          "logo":{
            "@type":"ImageObject",
            "url":"https://www.futbolecuador.com/assets/img/logo-futbolecuador.webp",
            "width":"285",
            "height":"32"
          }
        }]`,
    },
  },
  noscript: {
    default:
      'Porfavor activa Javascript en el navegador, para que se pueda visualizar el sitio.',
  },
};
