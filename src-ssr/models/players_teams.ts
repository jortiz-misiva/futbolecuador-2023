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

class Players_teams extends Model<
  InferAttributes<Players_teams>,
  InferCreationAttributes<Players_teams>
> {
  declare id: CreationOptional<number>;
  declare team_id: CreationOptional<number>;
  declare player_id: CreationOptional<number>;
  declare date_in: CreationOptional<Date>;
  declare date_out: CreationOptional<Date>;
}

Players_teams.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    player_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    date_in: {
      type: DataTypes.DATE,
    },
    date_out: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'players',
  }
);

export default Players_teams;
