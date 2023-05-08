import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Championships from './championships';
import Schedules from './schedules';
import Rounds from './rounds';
import Teams from './teams';
import Match from './match';

class Players extends Model<
  InferAttributes<Players>,
  InferCreationAttributes<Players>
> {
  declare id: CreationOptional<number>;
  declare nick: string;
  declare first_name: string;
  declare last_name: string;
}

Players.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    nick: {
      type: DataTypes.STRING(200),
    },
    first_name: {
      type: DataTypes.STRING(200),
    },
    last_name: {
      type: DataTypes.STRING(200),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'players',
  }
);

export default Players;
