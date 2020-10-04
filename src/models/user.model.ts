import sequelize, {
  Association,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Role, RoleAttributes } from "./role.model";

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // methods go here
  public getRoles!: HasManyGetAssociationsMixin<Role>;
  public setRoles!: HasManySetAssociationsMixin<Role, RoleAttributes["id"]>;

  public readonly roles?: Role[];

  public static associations: {
    roles: Association<User, Role>;
  };
}

const UserFactory = (sequelize: Sequelize) => {
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
    }
  );
  return User;
};

export default UserFactory;
