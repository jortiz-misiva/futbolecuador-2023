import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Section from './section';
import Teams from './teams';

class Histories extends Model<
  InferAttributes<Histories>,
  InferCreationAttributes<Histories>
> {
  declare id: CreationOptional<number>;
  declare team_id: CreationOptional<number>;
  declare palmares: string;
  declare best_players: string;
}

Histories.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    palmares: {
      type: DataTypes.STRING(100),
    },
    best_players: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'histories',
    modelName: 'detalle',
  }
);

//Histories.belongsTo(Teams, { as: 'hi', foreignKey: 'team_id' });

export default Histories;
