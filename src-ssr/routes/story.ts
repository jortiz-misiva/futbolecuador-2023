import { existStory } from './../helpers/db-validators';
import { Router } from 'express';
import { check } from 'express-validator';
import {
  //getStories,
  getStory,
  getMasLeidas,
  getNewsPrincipales,
  getNoticia,
  getNoticiasPorCategoria,
  getNoticiasPorTag,
  getBuscarItems,
  getResultadosBusqueda,
  getBuscarSugerencia,
  getVideos,
  getNoticiasAutor,
  //   postStory,
  //   putStory,
  //   deleteStory,
} from '../controllers/story.controller';
import validateFields from '../middlewares/validate_fields';

const router = Router();

router.get('/rotativas', getStory);
router.get('/principales', getNewsPrincipales);
router.get('/buscaritem', getBuscarItems);
router.get('/masleidas', getMasLeidas);
router.get('/sugerencia', getBuscarSugerencia);
router.get('/sugerencia/:lim/:offset', getBuscarSugerencia);
router.get('/autor/:nick', getNoticiasAutor);
router.get('/autor/:nick/:limite/:offset', getNoticiasAutor);
router.get('/videos', getVideos);
router.get('/videos/:limite/:offset', getVideos);
router.get('/buscaresultado', getResultadosBusqueda);
router.get('/buscaresultado/:limite/:offset', getResultadosBusqueda);
router.get('/buscaritem', getBuscarItems);
router.get('/buscaritem/:limite/:offset', getBuscarItems);
router.get('/buscaritem/:type', getBuscarItems);
router.get('/buscaritem/:type/:limite/:offset', getBuscarItems);
router.get('/masleidas/:limite', getMasLeidas);
router.get('/masleidas/:limite/:dias', getMasLeidas);
router.get('/rotativas/:lim', getStory);
router.get('/categoria/:slug', getNoticiasPorCategoria);
router.get('/tag/:nombre', getNoticiasPorTag);
router.get('/principales/:limite/:offset', getNewsPrincipales);
router.get('/tag/:nombre/:limite/:offset', getNoticiasPorTag);
router.get('/categoria/:slug/:limite/:offset', getNoticiasPorCategoria);
router.get(
  '/:id',
  [check('id').custom(existStory), validateFields],
  getNoticia
);

export default router;
