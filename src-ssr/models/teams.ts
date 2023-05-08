import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Matches_teams from './matches_teams';
import Match from './match';
import Groups from './groups';
import Stadium from './stadium';
import Histories from './histories';

class Teams extends Model<
  InferAttributes<Teams>,
  InferCreationAttributes<Teams>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare shield_big: string;
  declare short_name: string;
  declare mini_shield: string;
  declare category_id: CreationOptional<number>;
  declare stadia_id: CreationOptional<number>;
}

Teams.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(200),
    },
    shield_big: {
      type: DataTypes.STRING(200),
    },
    mini_shield: {
      type: DataTypes.STRING(200),
    },
    short_name: {
      type: DataTypes.STRING(200),
    },
    category_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    stadia_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'teams',
  }
);

Teams.belongsTo(Stadium, { as: 'sta', foreignKey: 'stadia_id' });

//Teams.belongsToMany(Match, { through: Matches_teams });

/*Teams.belongsToMany(Matches_teams, {
  as: 'mt',
  foreignKey: 'team_id_home',
});*/
/*Teams.belongsTo(Matches_teams, {
  as: 'name aname',
  foreignKey: 'team_id_away',
});*/

export default Teams;
