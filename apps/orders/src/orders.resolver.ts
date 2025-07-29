import { Resolver, Query, Mutation, ID, Args, InputType, Field } from '@nestjs/graphql';
import { Order } from './entities';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dtos';


@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { nullable: true })
  async order(@Args('id', { type: () => ID }) id: string): Promise<Order | null> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput): Promise<Order> {
    return this.ordersService.create(input);
  }
} 