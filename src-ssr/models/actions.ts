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

class Actions extends Model<
  InferAttributes<Actions>,
  InferCreationAttributes<Actions>
> {
  declare id: CreationOptional<number>;
  declare match_id: CreationOptional<number>;
  declare text: Buffer;
  declare created: Date;
  declare type: string;
  declare match_time: CreationOptional<number>;
}

Actions.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    match_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    text: {
      type: DataTypes.BLOB,
    },
    created: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.STRING,
    },
    match_time: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'actions',
    modelName: 'actions',
  }
);

//Goals.belongsTo(Matches_teams, { as: 'mtg', foreignKey: 'match_id' });

export default Actions;
