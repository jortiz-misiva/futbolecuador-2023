import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
  declare sum: CreationOptional<number>;
  declare actualizado: CreationOptional<Date>;
}

Tag.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(28),
    },
    slug: {
      type: DataTypes.STRING(28),
    },
    sum: {
      type: DataTypes.INTEGER({ length: 11 }),
      defaultValue: 0,
    },
    actualizado: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'tags',
    modelName: 'tags',
  }
);

export default Tag;
