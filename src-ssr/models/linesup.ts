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
import Players from './players';
import Matches_teams from './matches_teams';

class Linesup extends Model<
  InferAttributes<Linesup>,
  InferCreationAttributes<Linesup>
> {
  declare id: CreationOptional<number>;
  declare match_id: CreationOptional<number>;
  declare team_id: CreationOptional<number>;
  declare player_id: CreationOptional<number>;
  declare position: string;
  declare status: CreationOptional<number>;
  declare points: CreationOptional<number>;
}

Linesup.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    match_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    player_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    position: {
      type: DataTypes.STRING(200),
    },
    status: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    points: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'lineups',
    modelName: 'lineups',
  }
);

export default Linesup;
