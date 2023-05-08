import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Schedules from './schedules';
import Rounds from './rounds';

class Championships extends Model<
  InferAttributes<Championships>,
  InferCreationAttributes<Championships>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare image: string;
  declare year: CreationOptional<number>;
  declare active_round: CreationOptional<number>;
  declare active_championship: CreationOptional<number>;
  declare orden: string;
  declare tipo: string;
}

Championships.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    name: {
      type: DataTypes.STRING(200),
    },
    image: {
      type: DataTypes.STRING(200),
    },
    year: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    active_round: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    active_championship: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    orden: {
      type: DataTypes.STRING(1),
    },
    tipo: {
      type: DataTypes.STRING(1),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'championships',
  }
);

Championships.hasMany(Rounds, {
  as: 'ronda',
  foreignKey: 'championship_id',
  sourceKey: 'id',
});

/*Championships.hasMany(Schedules, {
  as: 'sch',
  foreignKey: 'round_id',
});*/

/*Championships.belongsTo(Schedules, {
  as: 'sch',
  foreignKey: 'round_id',
  targetKey: 'active_round',
});*/

export default Championships;
