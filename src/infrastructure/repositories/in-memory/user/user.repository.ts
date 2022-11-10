import { randomUUID } from "node:crypto";
import {
  CreateUser,
  IUserRepository,
  User,
} from "./../../interfaces/user.interface";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async createUser({ name, email, password }: CreateUser): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
    };
    this.users.push(user);
    return user;
  }

  async listUsers(): Promise<Omit<User, "password">[]> {
    return this.users;
  }
}
