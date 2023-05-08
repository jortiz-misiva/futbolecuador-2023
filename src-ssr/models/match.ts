import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Schedules from './schedules';
import Matches_teams from './matches_teams';
import Groups from './groups';
import Goals from './goals';
import Linesup from './linesup';

class Match extends Model<
  InferAttributes<Match>,
  InferCreationAttributes<Match>
> {
  declare id: CreationOptional<number>;
  declare special: CreationOptional<number>;
  declare group_id: CreationOptional<number>;
  declare date_match: CreationOptional<Date>;
  declare minute_match: CreationOptional<number>;
  declare result: string;
  declare state: CreationOptional<number>;
  declare stadia_id: CreationOptional<number>;
  declare story_id: CreationOptional<number>;
  declare schedule_id: CreationOptional<number>;
  declare live: CreationOptional<number>;
  declare og_image: string;
  declare datafactory_id: string;
}

Match.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    special: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    group_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    date_match: {
      type: DataTypes.DATE,
    },
    minute_match: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    result: {
      type: DataTypes.STRING(200),
    },
    state: {
      type: DataTypes.STRING(200),
    },
    stadia_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    story_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    schedule_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    live: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    og_image: {
      type: DataTypes.STRING(200),
    },
    datafactory_id: {
      type: DataTypes.STRING(200),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'matches',
  }
);

Match.hasMany(Matches_teams, {
  as: 'mt',
  foreignKey: 'match_id',
  sourceKey: 'id',
});

Match.hasMany(Goals, { foreignKey: 'match_id', sourceKey: 'id', as: 'mg' });

//Match.belongsTo(Goals, { as: 'mg', foreignKey: 'match_id' });

export default Match;
