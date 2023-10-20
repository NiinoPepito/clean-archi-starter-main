import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '@src/modules/order/domain/port/db/order.repository.interface';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(Order, datasource.createEntityManager());
  }

  async findOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    const orders = await query.getMany();

    return orders;
  }

  
  async findOrdersBeforeDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt < :date', { date: date });
    
    const orders = await query.getMany();

    return orders;
  }

  async findOrdersAfterDate(date: Date): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt > :date', { date: date });
    
    const orders = await query.getMany();

    return orders;
  }

  async findOrdersByCustomer(customerName: string): Promise<Order[]> {
    const query = this.createQueryBuilder('order');

    query.where('order.customer = :customerName', { customerName: customerName });
    
    const orders = await query.getMany();

    return orders;
  }
  
  async findOneById(id: string): Promise<Order> {
    const query = this.createQueryBuilder('order');
    query.where('order.id = :id', { id: id });

    return await query.getOne();
  }
  
  
}
