import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Section from './section';

class Stadium extends Model<
  InferAttributes<Stadium>,
  InferCreationAttributes<Stadium>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare capacity: CreationOptional<number>;
  declare city: string;
  declare image: string;
  declare height: CreationOptional<number>;
}

Stadium.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(200),
    },
    capacity: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    city: {
      type: DataTypes.STRING(100),
    },
    image: {
      type: DataTypes.STRING(200),
    },
    height: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'stadia',
  }
);

export default Stadium;
