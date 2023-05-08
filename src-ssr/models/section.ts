import sequelize from '../db/connection';
import Teams from './teams';
import Championships_teams from './teams';

import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Category from './category';
import Histories from './histories';

class Section extends Model<
  InferAttributes<Section>,
  InferCreationAttributes<Section>
> {
  declare id: CreationOptional<number>;
  declare header_id: number;
  declare team_id: number;
  declare championship_id: number;
  declare category_id: number;
  declare section_id: number;
  declare priority: number;
  declare name: string;
  declare image: string;
  declare wap: number;
  declare rss: number;
  declare image_rss: string;
  declare description: string;
  declare section: string;
}

Section.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    header_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    championship_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    category_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    section_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    priority: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    section: {
      type: DataTypes.STRING(100),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    image: {
      type: DataTypes.STRING(200),
    },
    wap: {
      type: DataTypes.INTEGER({ length: 1 }),
    },
    rss: {
      type: DataTypes.INTEGER({ length: 1 }),
    },
    image_rss: {
      type: DataTypes.STRING(200),
    },
    description: {
      type: DataTypes.STRING(400),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'sections',
    modelName: 'Section',
  }
);

Section.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });
Section.belongsTo(Teams, { as: 't', foreignKey: 'team_id' });
Section.belongsTo(Histories, { as: 'hi', foreignKey: 'team_id' });
Section.belongsTo(Category, { as: 'cat', foreignKey: 'category_id' });

export default Section;
