import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Update order status to cancel', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should return 404 if request is not a patch', async () => {
        const getOrderResponse = await request(app.getHttpServer()).get('/api/orders/02456b52-dddc-4e07-ad7a-67900368fcc3/cancel');

        expect(getOrderResponse.status).toBe(404);
    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});