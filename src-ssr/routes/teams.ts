import { Router } from 'express';
import { getEquipos, getSeccionEquipo } from '../controllers/team.controller';

const router = Router();

router.get('/lista/:champ', getEquipos);
router.get('/seccion/:slug', getSeccionEquipo);

export default router;
