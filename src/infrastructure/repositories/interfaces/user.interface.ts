export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export interface IUserRepository {
  createUser: ({ name, email, password }: CreateUser) => Promise<User>;
  listUsers: () => Promise<User[]>;
  findUserByEmail: (email: string) => Promise<User | null | undefined>;
}
