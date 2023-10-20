import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '@src/modules/order/domain/model/entity/order.orm-entity';
import OrderRepository from '@src/modules/order/infrastructure/db/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import { GetAllOrdersService } from './domain/service/use-case/get-orders-all.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { GetOrdersBeforeDateService } from './domain/service/use-case/get-orders-before-date.service';
import { GetOrdersAfterDateService } from './domain/service/use-case/get-orders-after-date.service';
import { GetOrdersByCustomerService } from './domain/service/use-case/get-orders-by-customer.service';
import UpdateOrderStatusToPaidService from './domain/service/use-case/update-order-to-paid.service';
import UpdateOrderStatusToCancelledService from './domain/service/use-case/update-order-to-canceled.service';
import DeleteOrderService from './domain/service/use-case/deleted-order-by-id.service';
import CreateOrderService from './domain/service/use-case/create-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },

    {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersBeforeDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersBeforeDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersAfterDateService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersAfterDateService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrdersByCustomerService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersByCustomerService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {provide: UpdateOrderStatusToPaidService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new UpdateOrderStatusToPaidService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: UpdateOrderStatusToCancelledService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new UpdateOrderStatusToCancelledService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },


    {
      provide: DeleteOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },


    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

  ],
})
export default class OrderModule {}
