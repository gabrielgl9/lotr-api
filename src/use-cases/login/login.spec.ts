import { UserRepository } from "../../infrastructure/repositories/in-memory/user.repository";
import { IUserRepository } from "./../../infrastructure/repositories/interfaces/user.interface";
import { CreateUserService } from "./../create-user/create-user.service";
import { LoginService } from "./login.service";

describe("Authenticate User", () => {
  let userRepository: IUserRepository;
  let loginService: LoginService;
  let createUserService: CreateUserService;

  beforeAll(async () => {
    userRepository = new UserRepository();
    loginService = new LoginService(userRepository);
    createUserService = new CreateUserService(userRepository);

    await createUserService.handle({
      name: "gabriel",
      email: "gabrielgl13@hotmail.com",
      password: "senha123",
    });
  });

  it("it should login an user", async () => {
    const login = await loginService.handle({
      email: "gabrielgl13@hotmail.com",
      password: "senha123",
    });

    expect(login).toHaveProperty("id");
    expect(login).toHaveProperty("token");
  });

  it("it should not be able to login an user because no email was informed", async () => {
    await expect(() =>
      loginService.handle({
        email: "",
        password: "senha123",
      })
    ).rejects.toThrow("email is a required field");
  });

  it("it should not login an user because email was invalid", async () => {
    await expect(() =>
      loginService.handle({
        email: "gabrielgl13333@hotmail.com",
        password: "senha123",
      })
    ).rejects.toThrow("User does not exists");
  });

  it("it should not login an user because password was invalid", async () => {
    await expect(() =>
      loginService.handle({
        email: "gabrielgl13@hotmail.com",
        password: "senha123456",
      })
    ).rejects.toThrow("User does not exists");
  });
});
