import { getImage } from './../controllers/images.controller';
import { Router } from 'express';

const router = Router();

router.get('/:formato/:id/:ext', getImage);

export default router;
