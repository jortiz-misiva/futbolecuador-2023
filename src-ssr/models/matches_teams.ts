import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Teams from './teams';
import Match from './match';

class Matches_teams extends Model<
  InferAttributes<Matches_teams>,
  InferCreationAttributes<Matches_teams>
> {
  declare id: CreationOptional<number>;
  declare match_id: CreationOptional<number>;
  declare team_id_home: CreationOptional<number>;
  declare team_id_away: CreationOptional<number>;
}

Matches_teams.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    match_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id_home: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id_away: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'matches_teams',
  }
);

Matches_teams.belongsTo(Teams, {
  as: 'local',
  foreignKey: 'team_id_home',
  targetKey: 'id',
});

Matches_teams.belongsTo(Teams, {
  as: 'visitante',
  foreignKey: 'team_id_away',
  targetKey: 'id',
});

export default Matches_teams;
