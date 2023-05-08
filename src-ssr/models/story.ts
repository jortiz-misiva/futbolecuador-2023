import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import User from './user';
import Image from './image';
import Category from './category';
import Tag from './tag';

class Story extends Model<
  InferAttributes<Story>,
  InferCreationAttributes<Story>
> {
  declare id: CreationOptional<number | null>;
  declare category_id: CreationOptional<number>;
  declare author_id: CreationOptional<number>;
  declare title: string;
  declare subtitle: string;
  declare twitter: string;
  declare lead: string;
  declare body: string;
  declare created: Date;
  declare modified: Date | null;
  declare programed: Date | null;
  declare image_id: number | null;
  declare position: number | null;
  declare origen: string;
  declare slug: string;
  declare rate: number;
  declare reads: number;
  declare sends: number;
  declare votes: number;
  declare invisible: number;
  declare sponsored: number;
  declare formato: number;
  declare destacado: number;
  declare tags: string;
  declare widget: string;
  declare published: boolean;
}

Story.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: { type: DataTypes.INTEGER({ length: 11 }) },
    author_id: { type: DataTypes.INTEGER({ length: 11 }) },
    formato: { type: DataTypes.INTEGER({ length: 11 }) },
    title: { type: DataTypes.STRING(100) },
    subtitle: { type: DataTypes.STRING(200) },
    twitter: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    lead: { type: DataTypes.TEXT },
    body: { type: DataTypes.TEXT },
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    modified: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    programed: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    image_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    position: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: true,
      defaultValue: null,
    },
    origen: { type: DataTypes.STRING(200) },
    rate: { type: DataTypes.INTEGER({ length: 11 }), defaultValue: 0 },
    reads: { type: DataTypes.INTEGER({ length: 11 }), defaultValue: 0 },
    sends: { type: DataTypes.INTEGER({ length: 11 }), defaultValue: 0 },
    votes: { type: DataTypes.INTEGER({ length: 11 }), defaultValue: 0 },
    invisible: { type: DataTypes.INTEGER({ length: 1 }), defaultValue: 1 },
    sponsored: { type: DataTypes.INTEGER({ length: 1 }), defaultValue: 0 },
    destacado: { type: DataTypes.INTEGER({ length: 1 }), defaultValue: 0 },
    tags: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    widget: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    published: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'stories',
  }
);

Story.belongsTo(User, {
  foreignKey: 'author_id',
  as: 'author',
});

Story.belongsTo(Image, { foreignKey: 'image_id', as: 'images' });
Story.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

export default Story;
