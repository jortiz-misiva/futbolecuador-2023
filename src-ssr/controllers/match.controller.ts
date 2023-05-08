import { Request, Response } from 'express';
import { isActiveCache } from 'src-ssr/helpers/functions';
import Players from 'src-ssr/models/players';
import cacheManager from 'src-ssr/services/cache-manager';
import sequelize from '../db/connection';
import {
  Championships,
  Match,
  Schedules,
  Matches_teams,
  Teams,
  Rounds,
  Goals,
  Linesup,
  Actions,
} from '../models';

export const getTorneoActive = async (req: Request, res: Response) => {
  try {
    const cachekey = `match:torneoactivo`;
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
      const rondas = await Rounds.findAll({
        attributes: ['id', 'name'],
        where: { championship_id: elem.id },
      });

      const fechaActiva = await Schedules.findOne({
        where: { active: 1, round_id: rondas[0]['id'] },
        attributes: ['season'],
      });

      if (fechaActiva) {
        let season = fechaActiva['season'] - 1;
        const factiva = Object.assign(elem, { fecha_activa: season });
        // torneos.push(factiva);
      } else {
        let season = null;
        const factiva = Object.assign(elem, { fecha_activa: season });
        //torneos.push(factiva);
      }
      const nelem = Object.assign(elem, {
        rondas: rondas,
      });
      torneos.push(nelem);
    }

    await cacheManager.set(cachekey, torneos, {
      expirationS: 300,
    });

    res.json(torneos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMatchDetalle = async (req: Request, res: Response) => {
  try {
    const { datafactory = 0 } = req.params;

    const cachekey = `match:detailimg:${datafactory}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const detalle = await Match.findOne({
      where: { datafactory_id: datafactory },
      attributes: ['id', 'og_image'],
      raw: true,
      nest: true,
    });

    await cacheManager.set(cachekey, detalle, {
      expirationS: 60,
    });

    res.json(detalle);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPartidoDetalle = async (req: Request, res: Response) => {
  try {
    const { id = 0 } = req.params;
    const cachekey = `match:detailmatch:${id}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    let detallepartido = await Match.findAll({
      attributes: [
        'id',
        [sequelize.literal('date_match'), 'dm'],
        'state',
        'minute_match',
        'result',
        'og_image',
      ],
      where: { id: Number(id) },
      include: [
        {
          model: Matches_teams,
          as: 'mt',
          attributes: ['id'],
          include: [
            {
              model: Teams,
              as: 'local',
              attributes: ['id', 'name', 'short_name', 'shield_big'],
            },
            {
              model: Teams,
              as: 'visitante',
              attributes: ['id', 'name', 'short_name', 'shield_big'],
            },
          ],
        },
      ],
    });

    const golespartido: any = await Goals.findAll({
      where: { match_id: Number(id) },
      attributes: ['id', 'minute', 'team_id'],
      include: [
        {
          model: Players,
          as: 'pg',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    const linematch: any = await Linesup.findAll({
      where: { match_id: Number(id) },
      attributes: ['id', 'position', 'status', 'team_id', 'player_id'],
    });

    let actionsmatch: any = await Actions.findAll({
      where: { match_id: Number(id) },
      attributes: ['text', 'match_time'],
      order: [['match_time', 'ASC']],
    });

    let goleslocales = [];
    let golesvisita = [];
    for (const elem of golespartido) {
      if (elem.team_id == detallepartido[0].mt[0].local.id) {
        goleslocales.push({
          nombre: elem.pg[0].first_name + ' ' + elem.pg[0].last_name,
          minuto: elem.minute,
        });
      }
    }

    for (const elem of golespartido) {
      if (elem.team_id == detallepartido[0].mt[0].visitante.id) {
        golesvisita.push({
          nombre: elem.pg[0].first_name + ' ' + elem.pg[0].last_name,
          minuto: elem.minute,
        });
      }
    }

    const local = {
      informacion: detallepartido[0].mt[0].local,
      jugadores: goleslocales,
    };

    const visitante = {
      informacion: detallepartido[0].mt[0].visitante,
      jugadores: golesvisita,
    };

    delete detallepartido[0].mt;

    for (const elem of actionsmatch) {
      elem.text = Buffer.from(elem.text).toString();
    }

    res.json({
      partido: detallepartido[0],
      local: local,
      visitante: visitante,
      acciones: actionsmatch,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMatch = async (req: Request, res: Response) => {
  try {
    const { ronda, fecha = 0 } = req.params;
    const cachekey = `match:detail:${ronda}:${fecha}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue && (await isActiveCache())) return res.json(cacheValue);

    const totalPartidos = await Schedules.count({
      where: { round_id: ronda },
      attributes: ['id', 'season'],
    });

    const resschedules = await Schedules.findAll({
      where: { round_id: ronda },
      attributes: ['id', 'season', 'position'],
      order: [['orden', 'ASC']],
      limit: 1,
      offset: Number(fecha),
      raw: true,
      nest: true,
    });

    const fechaActiva = await Schedules.findOne({
      where: { active: 1 },
      attributes: ['season'],
      raw: true,
      nest: true,
    });

    const eventos: any = [];
    for (const elem of resschedules) {
      let schId = elem.id;
      const partidos = await Match.findAll({
        attributes: [
          'id',
          [sequelize.literal('date_match'), 'dm'],
          'state',
          'minute_match',
          'result',
          'schedule_id',
          'group_id',
          'live',
          'datafactory_id',
          'og_image',
        ],
        where: { schedule_id: Number(schId) },
        include: [
          {
            model: Matches_teams,
            as: 'mt',
            attributes: ['id'],
            include: [
              {
                model: Teams,
                as: 'local',
                attributes: ['name', 'short_name', 'shield_big'],
              },
              {
                model: Teams,
                as: 'visitante',
                attributes: ['name', 'short_name', 'shield_big'],
              },
            ],
          },
        ],
        order: [
          ['state', 'ASC'],
          ['date_match', 'ASC'],
        ],
      });

      eventos.push(partidos);
    }

    const results = {
      id: ronda,
      total: totalPartidos,
      fecha_activa: fechaActiva!['season'] - 1,
      fecha: Number(fecha),
      partidos: eventos[0],
    };

    await cacheManager.set(cachekey, results, {
      expirationS: 300,
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getMatchesEnVivo = async (req: Request, res: Response) => {
  try {
    const { ronda } = req.params;

    const resschedules = await Schedules.findAll({
      where: { round_id: ronda },
      attributes: ['id', 'season'],
      order: [['season', 'DESC']],
      raw: true,
      nest: true,
    });

    const eventos: any = [];

    for (const elem of resschedules) {
      let schId = elem.id;
      const partidos = await Match.findAll({
        attributes: [
          'id',
          [sequelize.literal('date_match'), 'dm'],
          'state',
          'minute_match',
          'result',
          'schedule_id',
          'live',
          'datafactory_id',
        ],
        where: {
          schedule_id: Number(schId),
          date_match: {
            $gte: sequelize.literal('NOW()'),
          },
        },
        include: [
          {
            model: Matches_teams,
            as: 'mt',
            attributes: ['id'],
            include: [
              {
                model: Teams,
                as: 'local',
                attributes: ['name', 'short_name', 'shield_big'],
              },
              {
                model: Teams,
                as: 'visitante',
                attributes: ['name', 'short_name', 'shield_big'],
              },
            ],
          },
        ],
        order: [['dm', 'DESC']],
      });

      if (partidos.length > 0) {
        eventos.push(partidos);
      }
    }

    const result = {
      id: ronda,
      partidos: eventos,
    };

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
