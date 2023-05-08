import { Request, Response } from 'express';
import { Op } from 'sequelize';
import model from 'sequelize/types/model';
import Histories from 'src-ssr/models/histories';
import Stadium from 'src-ssr/models/stadium';
import sequelize from '../db/connection';
import {
  Teams,
  Championships,
  Championships_teams,
  Section,
  Category,
} from '../models';
//import { Category } from '@/interfaces/story';

export const getEquipos = async (req: Request, res: Response) => {
  try {
    const { champ } = req.params;
    const result = await Championships_teams.findOne({
      attributes: [
        [sequelize.literal('t.id'), 'id'],
        [sequelize.literal('t.name'), 'name'],
      ],
      where: {
        championship_id: champ,
      },
      include: [
        {
          model: Teams,
          as: 't',
          attributes: [],
        },
      ],
      order: [[{ model: Teams, as: 't' }, 'name', 'ASC']],
      raw: true,
      nest: true,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getSeccionEquipo = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await Section.findOne({
      attributes: [],
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn(
              'lower',
              sequelize.fn(
                'replace',
                sequelize.fn(
                  'replace',

                  sequelize.col('Section.name'),
                  ' ',
                  '-'
                ),
                '.',
                ''
              )
            ),
            {
              [Op.like]: slug,
            }
          ),
        ],
      },
      include: [
        {
          model: Teams,
          as: 't',
          attributes: [
            'id',
            'country',
            'couch',
            'president',
            'foundation',
            'twitter',
            'non_site',
            'shield_big',
            'shirt',
          ],
          include: [
            {
              model: Stadium,
              as: 'sta',
              attributes: ['name', 'capacity', 'city', 'image', 'height'],
            },
          ],
        },
        {
          model: Category,
          as: 'cat',
          attributes: [[sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      raw: true,
      nest: true,
    });

    const { cat, sta, ...detalle }: any = { ...(result as any).t };

    res.json({
      detalle,
      estadio: sta,
      categoria: (result as any).cat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
