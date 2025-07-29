import { Injectable } from '@nestjs/common';
import { Order } from './entities';

@Injectable()
export class OrdersService {
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
      customerId: '82806af9-3485-4e4f-98f9-467f6557c284',
      productName: 'Keyboard',
      quantity: 1,
      total: 100,
      status: 'DELIVERED',
    }
  ];

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orders.find(order => order.id === id) || null;
  }

  async create(orderData: Omit<Order, 'id'>): Promise<Order> {
    const newOrder = Order.create(orderData);
    this.orders.push(newOrder);
    return newOrder;
  }
}
