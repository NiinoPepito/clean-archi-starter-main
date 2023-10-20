import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import Order from '../../domain/model/entity/order.orm-entity';
import { GetAllOrdersService } from '../../domain/service/use-case/get-orders-all.service';
import { GetOrdersByCustomerService } from '../../domain/service/use-case/get-orders-by-customer.service';
import { GetOrdersBeforeDateService } from '../../domain/service/use-case/get-orders-before-date.service';
import { GetOrdersAfterDateService } from '../../domain/service/use-case/get-orders-after-date.service';
import UpdateOrderStatusToPaidService from '../../domain/service/use-case/update-order-to-paid.service';
import UpdateOrderStatusToCancelledService from '../../domain/service/use-case/update-order-to-canceled.service';
import DeleteOrderService from '../../domain/service/use-case/deleted-order-by-id.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import CreateOrderService from '../../domain/service/use-case/create-order.service';

@Controller('/orders')
export default class OrderController {
  constructor (
      private readonly getAllOrdersService: GetAllOrdersService,
      private readonly getOrdersBeforeDateService: GetOrdersBeforeDateService,
      private readonly getOrdersAfterDateService: GetOrdersAfterDateService,
      private readonly getOrdersByCustomerService: GetOrdersByCustomerService,
      private readonly updateOrderStatusToPaidService: UpdateOrderStatusToPaidService,
      private readonly updateOrderStatusToCancelledService: UpdateOrderStatusToCancelledService,
      private readonly deleteOrderService: DeleteOrderService,
      private readonly createOrderService: CreateOrderService,
  ){}

  @Get('/')
  async getOrders(): Promise<Order[]> {
      return await this.getAllOrdersService.getAllOrders();
  }

  @Get('/before/:date')
  async getOrdersBeforeDate(@Param('date') date: Date): Promise<Order[]> {
    return await this.getOrdersBeforeDateService.getOrdersBeforeDate(date);
  }

  @Get('/after/:date')
  async getOrdersAfterDate(@Param('date') date: Date): Promise<Order[]> {
    return await this.getOrdersAfterDateService.getOrdersAfterDate(date);
  }
  
  @Get('/customer/:name')
  async getOrdersByCustomer(@Param('name') name: string): Promise<Order[]> {
    return await this.getOrdersByCustomerService.getOrdersByCustomer(name);
  }

  @Patch('/:id/pay')
  async updateOrderStatusToPaid(@Param('id') id: string): Promise<Order> {
      return await this.updateOrderStatusToPaidService.updateOrderStatusToPaid(id);
  }

  @Patch('/:id/cancel')
  async updateOrderStatusToCancelled(@Param('id') id: string): Promise<Order> {
      return await this.updateOrderStatusToCancelledService.updateOrderStatusToCancelled(id);
  }

  @Delete('/:id/delete')
  async deleteOrder(@Param('id') id: string): Promise<void> {
      await this.deleteOrderService.deleteOrder(id);
  }

  @Post('/')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    await this.createOrderService.createOrder(createOrderDto);
}
}
