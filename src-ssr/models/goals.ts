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

class Goals extends Model<
  InferAttributes<Goals>,
  InferCreationAttributes<Goals>
> {
  declare id: CreationOptional<number>;
  declare match_id: CreationOptional<number>;
  declare team_id: CreationOptional<number>;
  declare player_id: CreationOptional<number>;
  declare minute: CreationOptional<number>;
  declare type: CreationOptional<number>;
}

Goals.init(
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
    minute: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    type: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'goals',
    modelName: 'goals',
  }
);

//Goals.belongsTo(Matches_teams, { as: 'mtg', foreignKey: 'match_id' });

Goals.hasMany(Players, { foreignKey: 'id', sourceKey: 'player_id', as: 'pg' });

Goals.hasMany(Teams, { foreignKey: 'id', sourceKey: 'team_id', as: 'tp' });

Goals.hasMany(Teams, { foreignKey: 'id', sourceKey: 'team_id', as: 'local' });

Goals.hasMany(Teams, {
  foreignKey: 'id',
  sourceKey: 'team_id',
  as: 'visitante',
});

export default Goals;
