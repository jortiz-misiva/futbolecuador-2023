import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  // host: process.env.DB_IP,
  host: process.env.DEV ? process.env.DB_IP : '127.0.0.1',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  dialectOptions: {
    dateStrings: true,
    typeCast(field: { type: string; string: () => any }, next: () => any) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  timezone: '-05:00',
  dialect: 'mysql',
  retry: {
    max: 2,
  },
  pool: {
    max: 40,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
});
export default sequelize;
