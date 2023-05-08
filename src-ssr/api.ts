import express, { Application } from 'express';
import sequelize from './db/connection';
import cors from 'cors';
import { imagesRoutes, noticiasRoutes, testRoutes } from './routes';
import { equiposRoutes } from './routes';
import { partidosRoutes } from './routes';
import { scoreboardsRoutes } from './routes';

class Api {
  private app: Application;
  private apiPaths = {
    users: '/api/users',
    auth: '/api/auth',
    noticias: '/api/noticias',
    partidos: '/api/partidos',
    tablas: '/api/tablas',
    equipos: '/api/equipos',
    // images: '/imagenes/images',
    tabla: '/api/tabla',
    test: '/api/test',
  };

  constructor(app: express.Application) {
    this.app = app;
    this.dbConnection();
    this.init();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log('Base de datos online');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error((error as Error).message);
      }
    }
  }

  async init() {
    //await sequelize.sync();
  }

  middlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.noticias, noticiasRoutes);
    this.app.use(this.apiPaths.equipos, equiposRoutes);
    this.app.use(this.apiPaths.partidos, partidosRoutes);
    // this.app.use(this.apiPaths.images, imagesRoutes);
    this.app.use(this.apiPaths.tabla, scoreboardsRoutes);
    this.app.use(this.apiPaths.test, testRoutes);
  }
}

export default Api;
