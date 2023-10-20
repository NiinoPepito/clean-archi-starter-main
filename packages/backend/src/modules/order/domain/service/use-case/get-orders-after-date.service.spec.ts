import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { dateAfter, dateBefore, orders } from '../utils/order-mock.fixture';
import { GetOrdersAfterDateService } from './get-orders-after-date.service';
import { GetOrdersBeforeDateService } from './get-orders-before-date.service';

describe('verifier get orders date after', () => {
  let orderRepositoryMock: OrderRepositoryInterface;

  beforeAll(() => {
    orderRepositoryMock = {
        findOrdersAfterDate: () => orders[0],
    } as unknown as OrderRepositoryInterface;
  });

  it('Should return orders with date after', async () => {

    const getOrdersAfterDateService = new GetOrdersAfterDateService(orderRepositoryMock);

    const result = await getOrdersAfterDateService.getOrdersAfterDate(dateAfter);

    expect(result).toEqual(orders[0]);
  });
});