import bcrypt from "bcryptjs";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/user.interface";
import { schema } from "./create-user.schema";

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async handle({ name, email, password }: CreateUser) {
    await schema.validate({ name, email, password });

    const userAlreadyExists = await this.userRepository.findUserByEmail(email);
    if (userAlreadyExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }
}
