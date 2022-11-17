import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  token: string;
}
