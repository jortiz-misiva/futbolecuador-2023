export const navLinks: {
  name: string;
  to: string;
  icon: string;
  activeIcon: string;
  isDrawer?: boolean;
}[] = [
  {
    icon: 'fa-solid fa-home',
    activeIcon: 'fa-solid fa-home',
    name: 'Inicio',
    to: 'inicio',
  },
  {
    icon: 'fa-solid fa-bars-progress',
    activeIcon: 'fa-solid fa-bars-progress',
    name: 'Posiciones',
    to: 'posiciones',
  },
  {
    icon: 'fa-solid fa-futbol',
    activeIcon: 'fa-solid fa-futbol',
    name: 'Calendario',
    to: 'calendario',
  },
  {
    icon: 'fa-solid fa-trophy',
    activeIcon: 'fa-solid fa-trophy',
    name: 'Torneos',
    to: 'torneos',
  },
  {
    icon: 'fa-solid fa-bars',
    activeIcon: 'fa-solid fa-bars',
    name: 'Menú',
    to: '',
    isDrawer: true,
  },
];

export const menuLinks: {
  name: string;
  to?: string;
  img?: string;
  items?: { to: string; label: string }[];
}[] = [
  {
    name: 'Serie A',
    img: 'imgs/series-a.png',
    items: [
      {
        label: 'Portada',
        to: '/serie-a',
      },
      {
        label: 'Calendario',
        to: '/torneos/ecuador/fixture',
      },
      {
        label: 'Posiciones',
        to: '/torneos/ecuador/posiciones',
      },
      {
        label: 'Goleadores',
        to: '/torneos/ecuador/goleadores',
      },
      {
        label: 'Equipos',
        to: '/torneos/ecuador/planteles',
      },
    ],
  },
  {
    name: 'Serie B',
    img: 'imgs/series-b.png',
    items: [
      {
        label: 'Portada',
        to: '/serie-b',
      },
      {
        label: 'Calendario',
        to: '/torneos/ecuadorb/fixture',
      },
      {
        label: 'Posiciones',
        to: '/torneos/ecuadorb/posiciones',
      },
      {
        label: 'Goleadores',
        to: '/torneos/ecuadorb/goleadores',
      },
      {
        label: 'Equipos',
        to: '/torneos/ecuadorb/planteles',
      },
    ],
  },
  {
    name: 'Copa Libertadores',
    img: 'imgs/copa-libertadores.png',
    items: [
      {
        label: 'Portada',
        to: '/copa-libertadores',
      },
      {
        label: 'Calendario',
        to: '/torneos/libertadores/fixture',
      },
      {
        label: 'Posiciones',
        to: '/torneos/libertadores/posiciones',
      },
      {
        label: 'Goleadores',
        to: '/torneos/libertadores/goleadores',
      },
      {
        label: 'Equipos',
        to: '/torneos/libertadores/planteles',
      },
    ],
  },
  {
    name: 'Copa Sudamericana',
    img: 'imgs/copa-sudamericana.png',
    items: [
      {
        label: 'Portada',
        to: '/copa-sudamericana',
      },
      {
        label: 'Calendario',
        to: '/torneos/sudamericana/fixture',
      },
      {
        label: 'Posiciones',
        to: '/torneos/sudamericana/posiciones',
      },
      {
        label: 'Goleadores',
        to: '/torneos/sudamericana/goleadores',
      },
      {
        label: 'Equipos',
        to: '/torneos/sudamericana/planteles',
      },
    ],
  },
  {
    name: 'Eliminatorias',
    to: '/eliminatorias',
  },
  {
    name: 'Selección',
    to: '/categoria/seleccion-nacional',
  },
  {
    name: 'En el exterior',
    to: '/categoria/en-el-exterior',
  },
  {
    name: 'Internacional',
    to: '/categoria/internacional',
  },
  {
    name: 'Torneos',
    to: '/torneos',
    items: [
      {
        label: 'Liga Pro Serie A',
        to: '/torneos/ecuador',
      },
      {
        label: 'Liga Pro Serie B',
        to: '/torneos/ecuadorb',
      },
      {
        label: 'Copa Libertadores',
        to: '/torneos/libertadores',
      },
      {
        label: 'Copa Sudamericana',
        to: '/torneos/sudamericana',
      },
      {
        label: 'Champions League',
        to: '/torneos/champions',
      },
      {
        label: 'Europa League',
        to: '/torneos/uefa',
      },
      {
        label: 'LaLiga España',
        to: '/torneos/espana',
      },
      {
        label: 'Premier League',
        to: '/torneos/premierleague',
      },
      {
        label: 'Serie A Italia',
        to: '/torneos/italia',
      },
      {
        label: 'Bundesliga',
        to: '/torneos/alemania',
      },
      {
        label: 'Ligue 1 Francia',
        to: '/torneos/francia',
      },
    ],
  },
];

export const sideMenuLinks: {
  name: string;
  to?: string;
  img?: string;
  items?: { to: string; label: string }[];
}[] = [
  {
    name: 'Serie A',
    to: '/serie-a',
  },
  {
    name: 'Serie B',
    to: '/serie-b',
  },
  {
    name: 'Copa Libertadores',
    to: '/copa-libertadores',
  },
  {
    name: 'Copa Sudamericana',
    to: '/copa-sudamericana',
  },
  {
    name: 'Eliminatorias',
    to: '/eliminatorias',
  },
  {
    name: 'Selección',
    to: '/categoria/seleccion-nacional',
  },
  {
    name: 'En el exterior',
    to: '/categoria/en-el-exterior',
  },
  {
    name: 'Internacional',
    to: '/categoria/internacional',
  },
  {
    name: 'Torneos',
    to: '/torneos',
  },
  {
    name: 'Videos',
    to: '/videos',
  },
];

export const footerMenuLinks: { name: string; to: string }[] = [
  {
    name: 'Selección',
    to: '/categoria/seleccion-nacional',
  },
  {
    name: 'Internacional',
    to: '/categoria/internacional',
  },
  {
    name: 'Torneos',
    to: '/torneos',
  },
];
