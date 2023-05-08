import { Request, Response } from 'express';
import sharp from 'sharp';
import { existsFile } from 'src-ssr/helpers/functions';
import { promises as fs } from 'fs';

export const getImage = async (req: Request, res: Response) => {
  const { id, formato, ext } = req.params;
  const { noconvert, avif } = req.query;
  try {
    const file = `/var/www/vhosts/futbolecuador.com/httpdocs/imagenes/images/${formato}/${id}.${ext}`;

    if (ext.toLowerCase().includes('webp') && (await existsFile(file))) {
      res.setHeader('content-type', 'image/webp');
      const webp = await fs.readFile(file);
      res.send(webp);
      return;
    }

    if (noconvert) {
      res.setHeader('content-type', 'image/jpg');
      return res.sendFile(file);
    }

    if (avif) {
      const avif = await sharp(file).avif().toBuffer();
      res.setHeader('content-type', 'image/avif');
      return res.send(avif);
    }

    const webp = await sharp(file).webp().toBuffer();
    res.setHeader('content-type', 'image/webp');
    res.send(webp);
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ msg: 'Imagen no encontrada' });
  }
};
