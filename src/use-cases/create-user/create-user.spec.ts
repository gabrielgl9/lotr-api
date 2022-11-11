import { UserRepository } from "../../infrastructure/repositories/in-memory/user/user.repository";
import { IUserRepository } from "./../../infrastructure/repositories/interfaces/user.interface";
import { CreateUserService } from "./create-user.service";

describe("Create User", () => {
  let userRepositoryInMemory: IUserRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    userRepositoryInMemory = new UserRepository();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it("it should create a new user", async () => {
    const userCreated = await createUserService.handle({
      name: "Gabriel Teste",
      email: "gabrielteste@gmail.com",
      password: "senha123",
    });

    expect(userCreated).toHaveProperty("id");
  });

  it("it should not be able to create a new user because no email was informed", async () => {
    await expect(() =>
      createUserService.handle({
        name: "Gabriel Teste 2",
        email: "",
        password: "senha123",
      })
    ).rejects.toThrow("email is a required field");
  });

  it("it should not be able to create a new user because this user already exists", async () => {
    await expect(() =>
      createUserService.handle({
        name: "Gabriel Teste 2",
        email: "gabrielteste@gmail.com",
        password: "senha123",
      })
    ).rejects.toThrow("User already exists");
  });
});
