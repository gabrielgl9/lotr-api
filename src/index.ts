import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./domain/resolvers/user/user.resolver";
import path from "node:path";

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