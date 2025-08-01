import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;
}