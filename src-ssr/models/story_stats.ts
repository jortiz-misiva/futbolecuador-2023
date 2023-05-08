import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Story from './story';

class StoryStats extends Model<
  InferAttributes<StoryStats>,
  InferCreationAttributes<StoryStats>
> {
  declare id: CreationOptional<number>;
  declare story_id: number;
  declare reads: string;
}

StoryStats.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    story_id: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    reads: {
      type: DataTypes.STRING(28),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'stories_stats',
  }
);

StoryStats.belongsTo(Story, { as: 'story', foreignKey: 'story_id' });
export default StoryStats;
