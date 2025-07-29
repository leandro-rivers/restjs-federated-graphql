import { Resolver, Query, ID, Args, ResolveReference } from '@nestjs/graphql';
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

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<Customer> {
    return this.customersService.findOne(reference.id);
  }
} 