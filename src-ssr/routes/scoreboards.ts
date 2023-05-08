import { Router } from 'express';
import {
  getTablaPosiciones,
  getTorneos,
  getTablaDetalle,
} from '../controllers/scoreboards.controller';

const router = Router();
router.get('/posiciones/:champ/:ronda', getTablaPosiciones);
router.get('/torneos/:champ', getTorneos);
router.get('/detalle/', getTablaDetalle);
router.get('/detalle/:serie', getTablaDetalle);
export default router;
