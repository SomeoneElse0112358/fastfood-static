const dotenv = require("dotenv");
const path = require("path");
const { cleanEnv, str } = require("envalid");

dotenv.config({ path: path.resolve(".env") });

const env = cleanEnv(process.env, {
  PORT: str(),
  SESSION_SECRET: str(),
  DB_HOST: str({ default: "fastfood-mongo" }),
  DB_PORT: str({ default: "27017" }),
  DB_NAME: str({ default: "fastfooddb" }),
});

module.exports = {
  port: env.PORT,
  secretSession: env.SESSION_SECRET,
  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    url: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
  },
};
