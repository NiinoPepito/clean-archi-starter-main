import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import Order from '../../model/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../port/db/order.repository.interface';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';

export class GetOrdersByCustomerService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface
  ) {}

  async getOrdersByCustomer(customerName): Promise<Order[]> {
    const orders = await this.orderRepository.findOrdersByCustomer(customerName);
    const nombreDeCaractere = 5;
    if (customerName.length < nombreDeCaractere) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `Le nombre de caractères du nom du Client "${customerName}" est inférieur à ${nombreDeCaractere} caractères`);
    }
    this.checkIfNumberInString;
    return orders;
  }

  private checkIfNumberInString(customerName: string) {
    if (customerName.match(/\d+/g)) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `Le nom du Client ${customerName} contient des chiffres`);
    }
  }
}
