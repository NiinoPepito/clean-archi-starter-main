import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('U^date Order To Paid', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('Should return empty array if no orders for this customer', async () => {
    const getOrdersByCustomerResponse = await request(app.getHttpServer()).get(`/api/orders/customer/ouiouioui`);

    expect(getOrdersByCustomerResponse.status).toBe(200);
    expect(getOrdersByCustomerResponse.body).toEqual([]);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
