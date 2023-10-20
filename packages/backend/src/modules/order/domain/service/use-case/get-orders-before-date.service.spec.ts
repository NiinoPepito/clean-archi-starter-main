import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { dateBefore, orders } from '../utils/order-mock.fixture';
import { GetOrdersBeforeDateService } from './get-orders-before-date.service';

describe('verifier get orders date before', () => {
  let orderRepositoryMock: OrderRepositoryInterface;

  beforeAll(() => {
    orderRepositoryMock = {
        findOrdersBeforeDate: () => orders[0],
    } as unknown as OrderRepositoryInterface;
  });

  it('Should return orders with date before', async () => {

    const getOrdersBeforeDateService = new GetOrdersBeforeDateService(orderRepositoryMock);

    const result = await getOrdersBeforeDateService.getOrdersBeforeDate(dateBefore);

    expect(result).toEqual(orders[0]);
  });
});