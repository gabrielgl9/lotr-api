import { IUserRepository } from "./../../infrastructure/repositories/interfaces/user.interface";

export class ListUserService {
  constructor(private userRepository: IUserRepository) {}

  async handle() {
    return await this.userRepository.listUsers();
  }
}
