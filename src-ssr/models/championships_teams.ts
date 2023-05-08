import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Teams from './teams';

class Championships_teams extends Model<
  InferAttributes<Championships_teams>,
  InferCreationAttributes<Championships_teams>
> {
  declare id: CreationOptional<number>;
  declare team_id: CreationOptional<number>;
  declare championship_id: CreationOptional<number>;
  declare round_id: CreationOptional<number>;
}

Championships_teams.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    team_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    championship_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    round_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'championships_teams',
  }
);

Championships_teams.belongsTo(Teams, { as: 't', foreignKey: 'team_id' });

export default Championships_teams;
