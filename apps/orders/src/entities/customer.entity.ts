import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@extends')
export class Customer {
  @Field(() => ID)
  @Directive('@external')
  id: string;
} 