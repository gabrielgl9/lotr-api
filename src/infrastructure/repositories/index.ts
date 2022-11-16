import { UserRepository } from "./prisma/user.repository";

export const REPOSITORIES = {
  USER_REPOSITORY: new UserRepository(),
};
