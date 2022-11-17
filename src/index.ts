import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import path from "node:path";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./domain/resolvers/user/user.resolver";

dotenv.config();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();

  console.log(`Server is running on ${url}`);
}

bootstrap();
