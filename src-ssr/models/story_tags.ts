import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import Tag from './tag';
import Story from './story';

class StoryTags extends Model<
  InferAttributes<StoryTags>,
  InferCreationAttributes<StoryTags>
> {
  declare id: CreationOptional<number>;
  declare tag_id: CreationOptional<number>;
  declare story_id: CreationOptional<number>;
}

StoryTags.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    tag_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      defaultValue: 0,
    },
    story_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'stories_tags',
  }
);

StoryTags.belongsTo(Tag, { as: 'tag', foreignKey: 'tag_id' });
StoryTags.belongsTo(Story, { as: 'story', foreignKey: 'story_id' });

export default StoryTags;
