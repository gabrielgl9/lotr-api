import { CreateUserService } from "./../create-user/create-user.service";
import { ListUserService } from "./list-users.service";
import { IUserRepository } from "../../infrastructure/repositories/interfaces/user.interface";
import { UserRepository } from "../../infrastructure/repositories/in-memory/user.repository";

describe("List users", () => {
  let userRepository: IUserRepository;
  let listUserService: ListUserService;
  let createUserService: CreateUserService;

  beforeAll(() => {
    userRepository = new UserRepository();
    listUserService = new ListUserService(userRepository);
    createUserService = new CreateUserService(userRepository);
  });

  it("it should list an empty array of users", async () => {
    const emptyUsers = await listUserService.handle();
    expect(emptyUsers.length).toBe(0);
  });

  it("it should list the user registred", async () => {
    const newUser = await createUserService.handle({
      name: "gabriel",
      email: "gabrielgl13@hotmail.com",
      password: "senha123",
    });

    const users = await listUserService.handle();

    expect(users).toEqual(
      expect.arrayContaining([expect.objectContaining(newUser)])
    );
  });
});
