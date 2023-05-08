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

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare id: CreationOptional<number>;
  declare round_id: CreationOptional<number>;
  declare name: string;
  declare description: string;
}

Groups.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    round_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(200),
    },
    description: {
      type: DataTypes.STRING(200),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'groups',
  }
);

export default Groups;
