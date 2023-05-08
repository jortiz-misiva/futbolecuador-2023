import moment from 'moment';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import sequelize from '../db/connection';
import {
  Category,
  Image,
  Story,
  Tag,
  User,
  StoryTags,
  StoryStats,
} from '../models';

import cacheManager from 'src-ssr/services/cache-manager';

/*noticias rotativas*/
export const getStory = async (req: Request, res: Response) => {
  try {
    let { lim = 9 } = req.params;
    const cachekey = `stories:rotativasEditorial:${lim}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);
    const fechaMenos48Horas = moment().subtract(48, 'hours').toDate();
    const editorial = await Story.findOne({
      limit: 1,
      where: {
        formato: 6,
        created: {
          [Op.gte]: fechaMenos48Horas,
        },
      },
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'formato',
        'slug',
      ],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    if (editorial && Object.keys(editorial).length > 0) {
      lim = 8;
    }

    const result = await Story.findAll({
      where: { position: 1, invisible: 0 },
      limit: Number(lim),
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'formato',
        'slug',
      ],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    const resultado = {
      noticias: result,
      editorial: editorial,
    };

    await cacheManager.set(cachekey, resultado, {
      expirationS: 120,
    });

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/*noticias prinicpales donde se selecciona las ultimas noticias y se excluyen las ultimas rotativas*/
export const getNewsPrincipales = async (req: Request, res: Response) => {
  try {
    const { limite = 20, offset = 0 } = req.params;
    const cachekey = `stories:principales:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const rotativas = await Story.findAll({
      where: { position: 1, invisible: 0 },
      limit: 9,
      attributes: ['id', 'title'],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    const arrRot: any[] = rotativas.map((item) => item.id);

    const result = await Story.findAll({
      where: {
        invisible: 0,
        id: {
          [Op.notIn]: arrRot,
        },
      },
      limit: Number(limite),
      offset: Number(offset),
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'formato',
        'slug',
      ],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    await cacheManager.set(cachekey, result, {
      expirationS: 900,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getMasLeidas = async (req: Request, res: Response) => {
  try {
    const { limite = 7, dias = 30 } = req.params;

    const cachekey = `stories:masleidas:${limite}:${dias}`;

    const cacheValue = await cacheManager.get(cachekey);

    if (cacheValue) return res.json(cacheValue);

    const now = new Date();

    now.setDate(now.getDate() - Number(dias));

    const result = await StoryStats.findAll({
      limit: Number(limite),
      order: [['reads', 'DESC']],
      attributes: [],
      include: [
        {
          model: Story,
          as: 'story',
          where: {
            created: { [Op.gte]: now },
          },
          attributes: [
            'id',
            'title',
            'subtitle',
            'sponsored',
            'created',
            'openseccion',
            'reads',
            'formato',
            'slug',
          ],
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['nick'],
            },
            {
              model: Image,
              as: 'images',
              attributes: [
                [sequelize.col('webpthumb300'), 'thumb300'],
                [sequelize.col('webpthumb640'), 'thumb640'],
                'has150',
                'name',
              ],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
    const results = result.map((x: any) => x.story);

    await cacheManager.set(cachekey, results, {
      expirationS: 25200,
    });

    res.json(results);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

export const getNoticia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pref = 0 } = req.query;
    if (id === undefined) {
      res.status(400).json({ message: 'Sin identificaor' });
    }

    if (pref == 0) {
      StoryStats.findOne({ where: { story_id: id } }).then((story) => {
        if (!story) return;
        story.reads = story.reads + 1;
        story.save();
      });
    }

    const cachekey = `stories:noticia:${id}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const [rstory, rtags]: [any, any] = await Promise.all([
      Story.findByPk(id, {
        attributes: [
          'id',
          'title',
          'subtitle',
          'sponsored',
          'created',
          'openseccion',
          'lead',
          'body',
          'origen',
          'widget',
          'formato',
        ],
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['nick', 'first_name', 'last_name', 'twitter'],
          },
          {
            model: Image,
            as: 'images',
            attributes: [
              [sequelize.col('webpthumb300'), 'thumb300'],
              [sequelize.col('webpthumb640'), 'thumb640'],
              'has150',
              'name',
            ],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
          },
        ],
        raw: true,
        nest: true,
      }),
      StoryTags.findAll({
        attributes: [],
        where: { story_id: id },
        include: [
          {
            model: Tag,
            as: 'tag',
            attributes: ['name', 'slug'],
            order: [['name', 'ASC']],
          },
        ],
        raw: true,
        nest: true,
      }),
    ]);

    if (rstory.widget) {
      rstory.widget = rstory.widget.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }

    rstory.tags = rtags.map((x: any) => x.tag);

    await cacheManager.set(cachekey, rstory, {
      expirationS: 300,
    });

    res.json(rstory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getNoticiasAutor = async (req: Request, res: Response) => {
  try {
    const { nick, limite = 20, offset = 0 } = req.params;

    const cachekey = `stories:author:${nick}:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const resultAutor: any = await User.findOne({
      where: { nick: nick },
      attributes: [
        'first_name',
        'last_name',
        'nick',
        'mail',
        'id',
        'description',
        'twitter',
        'created',
        'has150',
      ],
      raw: true,
      nest: true,
    });

    const result: any = await Story.findAndCountAll({
      limit: Number(limite),
      where: { invisible: 0 },
      offset: Number(offset),
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'openseccion',
        'formato',
        'slug',
      ],
      include: [
        {
          model: User,
          as: 'author',
          where: {
            nick: nick,
          },
          attributes: ['nick'],
        },
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    const results = {
      autor: resultAutor,
      total: result.count,
      noticias: result.rows,
    };

    await cacheManager.set(cachekey, results, {
      expirationS: 480,
    });

    res.json(results);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

export const getNoticiasPorCategoria = async (req: Request, res: Response) => {
  try {
    const { slug, limite = 20, offset = 0 } = req.params;

    const cachekey = `stories:category:${slug}:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const result: any = await Story.findAndCountAll({
      limit: Number(limite),
      offset: Number(offset),
      where: {
        id: {
          [Op.ne]: null,
        },
      },
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'openseccion',
        'formato',
        'slug',
      ],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          where: {
            slug,
          },
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    const results = {
      nombre: result.rows[0]?.category.name ?? '',
      total: result.count,
      noticias: result.rows,
    };

    await cacheManager.set(cachekey, results, {
      expirationS: 1800,
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/*buscador de noticias */
export const getBuscarItems = async (req: Request, res: Response) => {
  try {
    const { type = 0, limite = 10, offset = 0 } = req.params;
    const consulta = req.query.valor;

    const cachekey = `stories:searchItems:${type}:${consulta}:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    if (type == 'categoria') {
      const queryCategorias: any = {
        attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        where: { name: { [Op.like]: `%${consulta}%` } },
        order: [['id', 'DESC']],
        raw: true,
        nest: true,
      };

      const [resultcategoriasCount, resultcategorias] = await Promise.all([
        Category.count(queryCategorias),
        Category.findAll({
          ...queryCategorias,
          limit: Number(limite),
        }),
      ]);
      res.json({
        total: resultcategoriasCount,
        resultados: resultcategorias,
      });
    } else if (type == 'tag') {
      const queryTag: any = {
        attributes: ['name', 'slug'],
        where: { name: { [Op.like]: `%${consulta}%` } },
        order: [['id', 'DESC']],
        raw: true,
        nest: true,
      };

      const [resulttagCount, resultTagCount] = await Promise.all([
        Category.count(queryTag),
        Category.findAll({
          ...queryTag,
          limit: Number(limite),
        }),
      ]);

      res.json({
        total: resulttagCount,
        resultados: resultTagCount,
      });
    } else {
      /*busqueda por titilar*/
      const result: any = await Story.findAndCountAll({
        limit: Number(limite),
        offset: Number(offset),
        where: {
          title: { [Op.like]: `%${consulta}%` },
          invisible: 0,
        },
        attributes: ['id', 'title', 'subtitle', 'created', 'formato', 'slug'],
        include: [
          {
            model: Image,
            as: 'images',
            attributes: [
              [sequelize.col('webpthumb300'), 'thumb300'],
              [sequelize.col('webpthumb640'), 'thumb640'],
              'has150',
              'name',
            ],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
          },
        ],
        order: [['created', 'DESC']],
        raw: true,
        nest: true,
      });

      if (result.count == 0) {
        const result: any = await Story.findAndCountAll({
          limit: Number(limite),
          offset: Number(offset),
          where: {
            subtitle: { [Op.like]: `%${consulta}%` },
            invisible: 0,
          },
          attributes: ['id', 'title', 'subtitle', 'created', 'formato', 'slug'],
          include: [
            {
              model: Image,
              as: 'images',
              attributes: [
                [sequelize.col('webpthumb300'), 'thumb300'],
                [sequelize.col('webpthumb640'), 'thumb640'],
                'has150',
                'name',
              ],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
            },
          ],
          order: [['created', 'DESC']],
          raw: true,
          nest: true,
        });
      } else {
        const result: any = await Story.findAndCountAll({
          limit: Number(limite),
          offset: Number(offset),
          where: {
            lead: { [Op.like]: `%${consulta}%` },
            invisible: 0,
          },
          attributes: ['id', 'title', 'subtitle', 'created', 'formato', 'slug'],
          include: [
            {
              model: Image,
              as: 'images',
              attributes: [
                [sequelize.col('webpthumb300'), 'thumb300'],
                [sequelize.col('webpthumb640'), 'thumb640'],
                'has150',
                'name',
              ],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
            },
          ],
          order: [['created', 'DESC']],
          raw: true,
          nest: true,
        });
      }

      const results = {
        total: result.count,
        resultados: result.rows,
      };

      await cacheManager.set(cachekey, results, {
        expirationS: 300,
      });
      res.json(results);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getResultadosBusqueda = async (req: Request, res: Response) => {
  try {
    const { limite = 10, offset = 0 } = req.params;
    const consulta = req.query.valor;

    const cachekey = `stories:searchResult:${consulta}:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const result: any = await Story.findAndCountAll({
      limit: Number(limite),
      offset: Number(offset),
      where: { title: { [Op.like]: `%${consulta}%` }, invisible: 0 },
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'openseccion',
        'formato',
        'slug',
      ],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    const results = {
      nombre: result.rows[0]?.category.name ?? '',
      total: result.count,
      noticias: result.rows,
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

export const getBuscarSugerencia = async (req: Request, res: Response) => {
  try {
    const { lim = 3 } = req.params;
    const consulta = req.query.ids as string;
    const arr: string[] = consulta.split(',');

    const listnoticias = await Story.findAll({
      attributes: ['category_id'],
      where: {
        id: arr,
        invisible: 0,
      },
    });

    let set = new Set(listnoticias.map((n) => JSON.stringify(n)));
    let arrSinDuplicaciones = Array.from(set).map((n) => JSON.parse(n));
    let noticias: Story[] = [];
    for (const elem of arrSinDuplicaciones) {
      const sugerencia = await Story.findAll({
        limit: Number(lim),
        where: {
          category_id: elem.category_id,
          id: { [Op.notIn]: arr },
          invisible: 0,
        },
        attributes: [
          'id',
          'title',
          'subtitle',
          'sponsored',
          'created',
          'reads',
          'formato',
          'slug',
        ],
        include: [
          {
            model: Image,
            as: 'images',
            attributes: [
              [sequelize.col('webpthumb300'), 'thumb300'],
              [sequelize.col('webpthumb640'), 'thumb640'],
              'has150',
              'name',
            ],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
          },
        ],
        order: [['created', 'DESC']],
      });
      noticias.push(...sugerencia);
    }

    res.json(noticias);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getNoticiasPorTag = async (req: Request, res: Response) => {
  try {
    const { nombre, limite = 20, offset = 0 } = req.params;

    const cachekey = `stories:tag:${nombre}:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const result = await StoryTags.findAndCountAll({
      limit: Number(limite),
      offset: Number(offset),
      attributes: [[sequelize.col('tag.name'), 'name']],
      include: [
        {
          model: Tag,
          as: 'tag',
          attributes: [],
          where: {
            [Op.and]: [
              sequelize.where(sequelize.col('slug'), {
                [Op.like]: nombre,
              }),
            ],
          },
        },
        {
          model: Story,
          as: 'story',
          attributes: [
            'id',
            'title',
            'subtitle',
            'sponsored',
            'created',
            'formato',
            'slug',
            'category_id',
          ],
          where: {
            id: {
              [Op.ne]: null,
            },
          },
          include: [
            {
              model: Image,
              as: 'images',
              attributes: [
                [sequelize.col('webpthumb640'), 'thumb640'],
                [sequelize.col('webpthumb300'), 'thumb300'],
                'has150',
                'name',
              ],
            },
          ],
        },
      ],
      order: [[{ model: Story, as: 'story' }, 'created', 'DESC']],
      raw: true,
      nest: true,
    });

    if (result.count == 0)
      return res.status(400).json({ msg: 'No se encontrarosn resultados.' });

    const name: any = (result.rows[0] as any).name;

    const results = {
      nombre: name,
      total: result.count,
      noticias: result.rows.map((x: any) => x.story),
      // noticias: result.rows,
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

export const getVideos = async (req: Request, res: Response) => {
  try {
    const { limite = 4, offset = 0 } = req.params;

    const cachekey = `stories:videos:${limite}:${offset}`;
    const cacheValue = await cacheManager.get(cachekey);
    if (cacheValue) return res.json(cacheValue);

    const result = await Story.findAll({
      where: { formato: 1, invisible: 0 },
      limit: Number(limite),
      offset: Number(offset),
      attributes: [
        'id',
        'title',
        'subtitle',
        'sponsored',
        'created',
        'openseccion',
        'formato',
        'slug',
      ],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: [
            [sequelize.col('webpthumb300'), 'thumb300'],
            [sequelize.col('webpthumb640'), 'thumb640'],
            'has150',
            'name',
          ],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['name', [sequelize.col('slug'), 'slug-categoria']],
        },
      ],
      order: [['created', 'DESC']],
      raw: true,
      nest: true,
    });

    await cacheManager.set(cachekey, result, {
      expirationS: 600,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
