import { Request, Response } from 'express';
import cacheManager from 'src-ssr/services/cache-manager';

export const getStory = async (req: Request, res: Response) => {
  try {
    const resp = await cacheManager.get('test');

    if (resp) return res.json(resp);

    const result = {
      hola: 'mundo',
    };

    cacheManager.set('test', JSON.stringify(result), {
      expirationS: 300,
    });

    res.json(result);
  } catch (e) {
    console.log(e);

    res.status(500).json({ msg: 'la cagaste' });
  }
};
