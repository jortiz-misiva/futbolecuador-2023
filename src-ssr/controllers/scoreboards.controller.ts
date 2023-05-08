import { Request, Response } from 'express';
import { isActiveCache } from 'src-ssr/helpers/functions';
import cacheManager from 'src-ssr/services/cache-manager';
import sequelize from '../db/connection';

import {
  Teams,
  Championships,
  Championships_teams,
  Matches_teams,
  Rounds,
  Match,
  Schedules,
  Category,
  Marcadores,
} from '../models';
import Groups from '../models/groups';
import Section from '../models/section';

export const getTorneos = async (req: Request, res: Response) => {
  try {
    const cachekey = `scoreboards:torneos`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const torneos = [];
    const campeonatos = await Championships.findAll({
      where: { active_championship: '1' },
      attributes: ['id', 'name', 'active_round', 'orden'],
      order: [['orden', 'ASC']],
      raw: true,
      nest: true,
    });

    for (const elem of campeonatos) {
      const item = elem;
      const rondas = await Rounds.findAll({
        attributes: ['id', 'name'],
        where: { championship_id: elem.id },
      });
      const nelem = Object.assign(elem, { rodas: rondas });
      torneos.push(nelem);
    }

    await cacheManager.set(cachekey, torneos, {
      expirationS: 43200,
    });

    res.json(torneos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getTablaPosiciones = async (req: Request, res: Response) => {
  try {
    const { champ, ronda } = req.params;

    const cachekey = `scoreboards:torneos:${champ}:${ronda}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue && (await isActiveCache())) return res.json(cacheValue);

    let tablas = <any>{};
    const rondas: any = await Rounds.findOne({
      where: { championship_id: champ },
      include: [
        {
          model: Groups,
          where: { round_id: ronda },
          as: 'g',
          attributes: ['id', 'name'],
        },
      ],
      order: [['id', 'DESC']],
      raw: true,
      nest: true,
    });

    // for (const elem of rondas as any[]) {
    //   let grupoActivo = elem.g.id;
    //   const rondas = await Rounds.findAll({
    //     where: { championship_id: grupoActivo },
    //     include: [
    //       {
    //         model: Groups,
    //         as: 'g',
    //       },
    //     ],
    //     order: [['id', 'DESC']],
    //     raw: true,
    //     nest: true,
    //   });
    // }

    /*[sequelize.fn('DISTINCT', sequelize.col('Match.id')), 'id'],*/
    // for (const element of rondas as any[]) {
    const teamsgrupo = await Match.findAll({
      where: { group_id: rondas!.g.id },
      attributes: ['id', 'schedule_id', 'result', 'group_id'],
      include: [
        {
          model: Matches_teams,
          as: 'mt',
          attributes: ['id', 'match_id'],
          include: [
            {
              model: Teams,
              as: 'local',
              attributes: ['id', 'name', 'short_name', 'mini_shield'],
            },
            {
              model: Teams,
              as: 'visitante',
              attributes: ['id', 'name', 'short_name', 'mini_shield'],
            },
          ],
        },
        {
          model: Schedules,
          as: 'sch',
          attributes: ['id', 'position', 'round_id'],
        },
      ],
      raw: true,
      nest: true,
    });

    const listadoEquipos = await Championships_teams.findAll({
      where: { championship_id: champ },
      attributes: ['team_id'],
      raw: true,
      nest: true,
    });

    const tabla = [];
    for (const equi of listadoEquipos) {
      const team: any = {};

      let detalleseccion = await Section.findOne({
        where: { team_id: equi.team_id },
        attributes: [
          'id',
          [
            sequelize.fn(
              'REPLACE',
              sequelize.fn(
                'LOWER',
                sequelize.fn('REPLACE', sequelize.col('Section.name'), ' ', '-')
              ),
              '.',
              ''
            ),
            'valor',
          ],
        ],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['slug'],
          },
        ],
        raw: true,
        nest: true,
      });

      team['id'] = equi.team_id;
      team['name'] = '';
      team['short_name'] = '';
      team['group_name'] = '';
      team['mini_shield'] = '';
      team['slug-categoria'] = (detalleseccion as any).category.slug;
      team['seccion'] = detalleseccion!.section;
      team['seccion_id'] = detalleseccion!.id;
      team['points'] = 0;
      team['pj'] = 0;
      team['pg'] = 0;
      team['pe'] = 0;
      team['pp'] = 0;
      team['gf'] = 0;
      team['gc'] = 0;
      team['gd'] = 0;
      team['change'] = 1;
      team['updown'] = 0;
      tabla.push(team);
    }

    // let table_ant = tabla;

    for (const elem of teamsgrupo as any[]) {
      tabla.forEach((equipo: any) => {
        if (equipo.id == elem.mt.local.id) {
          equipo.name = elem.mt.local.name;
          equipo.short_name = elem.mt.local.short_name;
          equipo.group_name = elem.mt.local.group_name;
          equipo.mini_shield = elem.mt.local.mini_shield;
        }
      });
    }

    for (const t of teamsgrupo as any[]) {
      let result = t.result.split('-');
      const h = Number(result[0]);
      const a = Number(result[1]);

      if (h > a) {
        tabla.forEach((equipo) => {
          if (equipo.id == t.mt.local.id) {
            equipo.points += 3;
            equipo.gf += Number(h);
            equipo.gc += Number(a);
            equipo.gd += Number(h) - Number(a);
            equipo.pg += 1;
            equipo.pj += 1;
          }

          if (equipo.id == t.mt.visitante.id) {
            equipo.pp += 1;
            equipo.pj += 1;
            equipo.gf += Number(a);
            equipo.gc += Number(h);
            equipo.gd += Number(a) - Number(h);
          }
        });
      } else if (a > h) {
        tabla.forEach((equipo) => {
          if (equipo.id == t.mt.local.id) {
            equipo.gf += Number(h);
            equipo.gc += Number(a);
            equipo.gd += Number(h) - Number(a);
            equipo.pp += 1;
            equipo.pj += 1;
          }

          if (equipo.id == t.mt.visitante.id) {
            equipo.points += 3;
            equipo.gf += Number(a);
            equipo.gc += Number(h);
            equipo.gd += Number(a) - Number(h);
            equipo.pg += 1;
            equipo.pj += 1;
          }
        });
      } else if (a == h) {
        tabla.forEach((equipo) => {
          if (equipo.id == t.mt.local.id) {
            equipo.points += 1;
            equipo.gf += Number(h);
            equipo.gc += Number(a);
            equipo.pe += 1;
            equipo.pj += 1;
          }

          if (equipo.id == t.mt.visitante.id) {
            equipo.points += 1;
            equipo.gf += Number(a);
            equipo.gc += Number(h);
            equipo.pe += 1;
            equipo.pj += 1;
          }

          equipo.gd = equipo.gf - equipo.gc;
        });
      }
    }

    tabla.sort((x, y) => {
      if (x.points !== y.points) {
        return y.points - x.points;
      }

      if (x.gd !== y.gd) {
        return y.gd - x.gd;
      }

      if (x.gf !== y.gf) {
        return y.gf - x.gf;
      }

      if (x.gc !== y.gc) {
        return y.gc - x.gc;
      }

      if (x.gf > y.gf) {
        return -1;
      }
      if (x.gf < y.gf) {
        return 1;
      }

      return 0;
    });
    tablas = { nombre: rondas!.name, posiciones: tabla };
    // }
    const resTabla = tablas;
    await cacheManager.set(cachekey, resTabla, {
      expirationS: 300,
    });

    res.json(resTabla);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getTablaDetalle = async (req: Request, res: Response) => {
  try {
    const { serie = 0 } = req.params;
    if (serie == 0) {
      const detalle = await Marcadores.findOne({
        where: { tipo: '1', serie: 'a' },
        attributes: ['link', [sequelize.col('imagen'), 'og_image']],
        order: [['id', 'DESC']],
        limit: 1,
        raw: true,
        nest: true,
      });
      res.json(detalle);
    } else {
      const detalle = await Marcadores.findOne({
        where: { tipo: '1', serie: 'b' },
        attributes: ['link', [sequelize.col('imagen'), 'og_image']],
        order: [['id', 'DESC']],
        limit: 1,
        raw: true,
        nest: true,
      });
      res.json(detalle);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
