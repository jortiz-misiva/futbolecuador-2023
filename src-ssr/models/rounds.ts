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
import Groups from './groups';

class Rounds extends Model<
  InferAttributes<Rounds>,
  InferCreationAttributes<Rounds>
> {
  declare id: CreationOptional<number>;
  declare championship_id: CreationOptional<number>;
  declare name: string;
  declare image: string;
  declare priority: CreationOptional<number>;
  declare last: CreationOptional<number>;
}

Rounds.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    championship_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(200),
    },
    image: {
      type: DataTypes.STRING(200),
    },
    priority: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    last: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'rounds',
  }
);

Rounds.hasMany(Schedules, {
  as: 'r',
  foreignKey: 'round_id',
});

Rounds.hasMany(Schedules, {
  as: 'sch',
  foreignKey: 'round_id',
});

Rounds.hasOne(Groups, {
  as: 'g',
  foreignKey: 'round_id',
});

export default Rounds;
