import { Resolver, Query, Mutation, ID, Args, InputType, Field, Parent, ResolveReference, ResolveField } from '@nestjs/graphql';
import { Order, Customer } from './entities';
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

  @ResolveField(() => Customer)
  async customer(@Parent() order: Order): Promise<Customer> {
    // This field resolver will be called by the gateway
    // The gateway will handle the actual resolution to the Customers service
    return { id: order.customerId };
  }
}

@Resolver(() => Customer)
export class CustomerResolver {
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<Customer> {
    // This resolver is called by the gateway when it needs to resolve a Customer reference
    return { id: reference.id };
  }
} 