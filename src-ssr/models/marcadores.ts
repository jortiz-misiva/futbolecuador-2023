import sequelize from '../db/connection';
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class Marcadores extends Model<
  InferAttributes<Marcadores>,
  InferCreationAttributes<Marcadores>
> {
  declare id: CreationOptional<number>;
  declare texto: string;
  declare link: string;
  declare imagen: string;
  declare creado: CreationOptional<Date>;
  declare tipo: string;
  declare serie: string;
}

Marcadores.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER({ length: 11 }),
    },
    texto: {
      type: DataTypes.STRING(250),
    },
    link: {
      type: DataTypes.STRING(250),
    },
    imagen: {
      type: DataTypes.STRING(250),
    },
    creado: {
      type: DataTypes.DATE,
    },
    tipo: {
      type: DataTypes.STRING(1),
    },
    serie: {
      type: DataTypes.STRING(1),
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'imagenesmarcador',
    modelName: 'imagenesmarcador',
  }
);

export default Marcadores;
