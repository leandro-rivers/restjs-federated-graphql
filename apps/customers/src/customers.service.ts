import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entitites';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: '82806af9-3485-4e4f-98f9-467f6557c2',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    },
    {
      id: '1f0d864c-a59f-4593-87ce-9b3b991b902a',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
    },
    {
      id: '5e2a2cbd-ec0d-4461-85f4-dbe561e376f6',
      name: 'Jim Beam',
      email: 'jim@example.com',
      phone: '+0987654321',
    },
  ];

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findOne(id: string): Promise<Customer> {
    const customer = this.customers.find(customer => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer not found with id ${id}`);
    }
    return customer;
  }
}
