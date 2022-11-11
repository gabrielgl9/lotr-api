import { randomUUID } from "node:crypto";
import {
  CreateUser,
  IUserRepository,
  User,
} from "../interfaces/user.interface";

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

  async listUsers(): Promise<User[]> {
    return this.users;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
