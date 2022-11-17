import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "./../../infrastructure/repositories/interfaces/user.interface";
import { schema } from "./login.schema";

type Login = {
  email: string;
  password: string;
};

export class LoginService {
  constructor(private userRepository: IUserRepository) {}

  async handle({ email, password }: Login) {
    await schema.validate({ email, password });

    const user = await this.userRepository.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new Error("User does not exists");

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.TOKEN_KEY + "",
      {
        expiresIn: "2h",
      }
    );

    return { ...user, token };
  }
}
