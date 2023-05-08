import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Story from './story';

class Image extends Model<
  InferAttributes<Image>,
  InferCreationAttributes<Image>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare text: string;
  declare original: string;
  declare thumb640: string;
  declare webpthumb640: string;
  declare thumb500: CreationOptional<string | null>;
  declare thumb400: string;
  declare thumb300: string;
  declare has150: string;
  declare webpthumb300: string;
  declare thumb150: string;
  declare thumb100: string;
  declare thumbh160: string;
  declare thumbh120: string;
  declare thumbh80: string;
  declare thumbh50: string;
  declare created: CreationOptional<Date>;
}

Image.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    text: {
      type: DataTypes.STRING(100),
    },
    original: {
      type: DataTypes.STRING(200),
    },
    thumb640: {
      type: DataTypes.STRING(200),
    },
    webpthumb640: {
      type: DataTypes.STRING(200),
    },
    has150: {
      type: DataTypes.STRING(200),
    },
    thumb500: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
    },
    thumb400: {
      type: DataTypes.STRING(200),
    },
    thumb300: {
      type: DataTypes.STRING(200),
    },
    webpthumb300: {
      type: DataTypes.STRING(200),
    },
    thumb150: {
      type: DataTypes.STRING(200),
    },
    thumb100: {
      type: DataTypes.STRING(200),
    },
    thumbh160: {
      type: DataTypes.STRING(200),
    },
    thumbh120: {
      type: DataTypes.STRING(200),
    },
    thumbh80: {
      type: DataTypes.STRING(200),
    },
    thumbh50: {
      type: DataTypes.STRING(200),
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'images',
  }
);

export default Image;
