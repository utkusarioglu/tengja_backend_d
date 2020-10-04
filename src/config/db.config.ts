const { POSTGRES_USER, POSTGRES_PASS, POSTGRES_DB } = process.env as {
  [k: string]: string;
};

const DB_CONFIG = {
  HOST: "postgres",
  USER: POSTGRES_USER,
  PASSWORD: POSTGRES_PASS,
  DB: POSTGRES_DB,
  dialect: "postgres" as "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default DB_CONFIG;
