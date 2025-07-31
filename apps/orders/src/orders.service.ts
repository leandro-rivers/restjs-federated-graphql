import { Injectable, Logger } from '@nestjs/common';
import { Order } from './entities';
import { CreateOrderInput } from './dtos';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/configuration';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private configService: ConfigService<Config>) {
  }

  private orders: Order[] = [
    {
      id: '7ba4ce1e-800e-4b45-b7b1-10ea67e14c4b',
      customerId: '5e2a2cbd-ec0d-4461-85f4-dbe561e376f6',
      productName: 'Laptop',
      quantity: 1,
      total: 999.99,
      status: 'PENDING',
    },
    {
      id: '8e31cc53-e038-403e-8070-1ddba80ab734',
      customerId: '1f0d864c-a59f-4593-87ce-9b3b991b902a',
      productName: 'Mouse',
      quantity: 2,
      total: 49.98,
      status: 'SHIPPED',
    },
    {
      id: '7c702257-85d2-49dd-a7c9-2e7584c8b756',
      customerId: '82806af9-3485-4e4f-98f9-467f6557c2',
      productName: 'Keyboard',
      quantity: 1,
      total: 100,
      status: 'DELIVERED',
    }
  ];

  async findAll(): Promise<Order[]> {
    this.logger.debug('Finding all orders');
    return this.orders;
  }

  async findOne(id: string): Promise<Order | null> {
    this.logger.debug(`Finding order with id: ${id}`);
    return this.orders.find(order => order.id === id) || null;
  }

  async create(input: CreateOrderInput): Promise<Order> {
    this.logger.debug(`Creating order with input: ${JSON.stringify(input)}`);
    const newOrder = Order.create(input);
    this.orders.push(newOrder);
    return newOrder;
  }
}
