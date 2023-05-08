import { Router } from 'express';
import { getStory } from 'src-ssr/controllers/test';

const router = Router();

router.get('/rotativas', getStory);

export default router;
