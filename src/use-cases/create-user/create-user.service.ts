import { schema } from "./create-user.schema";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/user.interface";

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

    return await this.userRepository.createUser({ name, email, password });
  }
}
