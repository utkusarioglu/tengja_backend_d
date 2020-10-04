import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { ROLES } from "../constants";

export interface RoleAttributes {
  id?: number;
  name: ROLES;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes {
  public id!: number;
  public name!: ROLES;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const RoleFactory = (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );
  return Role;
};

export default RoleFactory;
