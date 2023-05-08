import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare role_id: CreationOptional<number>;
  declare first_name: string;
  declare last_name: string;
  declare nick: string;
  declare mail: string;
  declare city_id: CreationOptional<number>;
  declare country_id: CreationOptional<number>;
  declare team_id: number | null;
  declare suscription: CreationOptional<number>;
  declare description: CreationOptional<string>;
  declare created: CreationOptional<Date>;
  declare modified: Date | null;
  declare password: string;
  declare counter: CreationOptional<number>;
  declare active: CreationOptional<number>;
  declare last_login: string | null;
  declare activation_key: string | null;
  declare points: CreationOptional<number>;
  declare birth: CreationOptional<Date>;
  declare sex: number;
  declare twitter: string;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    role_id: {
      type: DataTypes.INTEGER({ length: 11 }),
      defaultValue: 2,
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    nick: {
      type: DataTypes.STRING(50),
    },
    mail: {
      type: DataTypes.STRING,
    },
    city_id: {
      type: DataTypes.INTEGER({ length: 10 }),
    },
    country_id: {
      type: DataTypes.INTEGER({ length: 10 }),
      defaultValue: 62,
    },
    team_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    suscription: {
      type: DataTypes.INTEGER({ length: 1 }),
    },
    description: {
      type: DataTypes.TEXT,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(50),
    },
    counter: {
      type: DataTypes.INTEGER({ length: 11 }),
    },
    active: {
      type: DataTypes.INTEGER({ length: 1 }),
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: true,
    },
    activation_key: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: true,
    },
    points: {
      type: DataTypes.INTEGER({ length: 11 }),
      defaultValue: 0,
    },
    birth: {
      type: DataTypes.DATEONLY,
    },
    sex: {
      type: DataTypes.STRING(1),
    },
    twitter: {
      type: DataTypes.STRING(40),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      onlyName: {
        attributes: {
          exclude: ['password'],
        },
      },
    },
  }
);

export default User;
