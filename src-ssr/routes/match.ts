import { Router } from 'express';
import {
  getMatch,
  getMatchesEnVivo,
  getTorneoActive,
  getMatchDetalle,
  getPartidoDetalle,
} from '../controllers/match.controller';

const router = Router();

// router.get('/fecha', getMatch);
// router.get('/envivo', getMatchesEnVivo);
//router.get('/fecha/:champ/:ronda', getMatch);
router.get('/torneos', getTorneoActive);
router.get('/calendario/:ronda', getMatch);
router.get('/detalle/:datafactory', getMatchDetalle);
router.get('/calendario/:ronda/:fecha', getMatch);
router.get('/envivo/:champ/:ronda', getMatchesEnVivo);
router.get('/info/:id', getPartidoDetalle);

export default router;
