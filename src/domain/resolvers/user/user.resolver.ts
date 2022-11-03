import { UserModel } from "./../../dtos/models/user.model";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "./../../dtos/inputs/create-user.input";
import { randomUUID } from "node:crypto";

@Resolver()
export class UserResolver {
  @Query(() => [UserModel])
  async users() {
    return [];
  }

  @Mutation(() => UserModel)
  async createUser(@Arg("data") data: CreateUserInput) {
    return {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }
}
