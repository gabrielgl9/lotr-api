import { IUserRepository } from "../../infrastructure/repositories/interfaces/user.interface";

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async handle({ name, email, password }: CreateUser) {
    try {
      return await this.userRepository.createUser({ name, email, password });
    } catch (e: any) {
      console.log(e);
    }
  }
}
