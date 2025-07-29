import { Resolver, Query, ID, Args } from '@nestjs/graphql';
import { Customer } from './entitites';
import { CustomersService } from './customers.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => [Customer])
  async customers(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Query(() => Customer)
  async customer(@Args('id', { type: () => ID }) id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }
} 