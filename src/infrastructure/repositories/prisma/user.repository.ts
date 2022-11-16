import { PrismaClient } from "@prisma/client";
import {
  CreateUser,
  IUserRepository,
  User,
} from "../interfaces/user.interface";

export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async createUser({ name, email, password }: CreateUser): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async listUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<User | null | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
