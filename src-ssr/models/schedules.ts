import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Championships from './championships';
import Match from './match';
import Rounds from './rounds';

class Schedules extends Model<
  InferAttributes<Schedules>,
  InferCreationAttributes<Schedules>
> {
  declare id: CreationOptional<number>;
  declare round_id: CreationOptional<number>;
  declare season: CreationOptional<number>;
  declare position: CreationOptional<number>;
  declare active: CreationOptional<number>;
  declare orden: CreationOptional<number>;
}

Schedules.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    round_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    season: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    position: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    active: {
      type: DataTypes.INTEGER({ length: 1 }),
    },
    orden: {
      type: DataTypes.INTEGER({ length: 1 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'schedules',
  }
);

Schedules.hasMany(Match, {
  as: 'm',
  foreignKey: 'schedule_id',
});

Match.belongsTo(Schedules, {
  as: 'sch',
  foreignKey: 'schedule_id',
  targetKey: 'id',
});

export default Schedules;
