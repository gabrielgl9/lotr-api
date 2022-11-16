import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserService } from "../../../use-cases/create-user/create-user.service";
import { ListUserService } from "../../../use-cases/list-users/list-users.service";
import { REPOSITORIES } from "./../../../infrastructure/repositories/index";
import { CreateUserInput } from "./create-user.input";
import { UserModel } from "./user.model";

@Resolver()
export class UserResolver {
  private userRepository = REPOSITORIES.USER_REPOSITORY;
  private createUserService = new CreateUserService(this.userRepository);
  private listUserService = new ListUserService(this.userRepository);

  @Query(() => [UserModel])
  async users() {
    return await this.listUserService.handle();
  }

  @Mutation(() => UserModel)
  async createUser(@Arg("data") data: CreateUserInput) {
    return await this.createUserService.handle(data);
  }
}
