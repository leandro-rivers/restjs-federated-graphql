import { Field, ID, ObjectType } from "@nestjs/graphql";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  customerId: string;

  @Field()
  productName: string;

  @Field()
  quantity: number;

  @Field()
  total: number;

  @Field()
  status: string;

  static create(data: Omit<Order, 'id'>): Order {
    const order = new Order();
    order.id = uuidv4();
    order.customerId = data.customerId;
    order.productName = data.productName;
    order.quantity = data.quantity;
    order.total = data.total;
    order.status = data.status;
    return order;
  }
}