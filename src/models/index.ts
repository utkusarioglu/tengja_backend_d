import DB_CONFIG from "../config/db.config";
import { Sequelize } from "sequelize";
import UserFactory from "./user.model";
import RoleFactory from "./role.model";

const sequelize = new Sequelize(
  DB_CONFIG.DB,
  DB_CONFIG.USER,
  DB_CONFIG.PASSWORD,
  {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.dialect,
    // operatorsAliases: false,
    pool: {
      ...DB_CONFIG.pool,
    },
  }
);

const db = {
  Sequelize,
  sequelize,
  User: UserFactory(sequelize),
  Role: RoleFactory(sequelize),
  ROLES: ["user", "admin", "moderator"],
};

db.Role.belongsToMany(db.User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.User.belongsToMany(db.Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

export default db;
export const User = db.User;
export const Role = db.Role;
export { Op } from "sequelize";
