import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserRepository } from "../../../infrastructure/repositories/in-memory/user.repository";
import { CreateUserService } from "../../../use-cases/create-user/create-user.service";
import { CreateUserInput } from "./create-user.input";
import { UserModel } from "./user.model";

@Resolver()
export class UserResolver {
  private userRepository = new UserRepository();
  private userService = new CreateUserService(this.userRepository);

  @Query(() => [UserModel])
  async users() {
    return [];
  }

  @Mutation(() => UserModel)
  async createUser(@Arg("data") data: CreateUserInput) {
    return await this.userService.handle(data);
  }
}
