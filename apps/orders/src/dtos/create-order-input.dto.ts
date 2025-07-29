import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class CreateOrderInput {
  @Field()
  @IsUUID()
  customerId: string;

  @Field()
  productName: string;

  @Field()
  quantity: number;

  @Field()
  total: number;

  @Field()
  status: string;
}