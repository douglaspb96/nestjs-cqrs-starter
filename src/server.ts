import './vendor';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { createConnections } from 'typeorm';
import { ValidationPipe } from './pipe/validation.pipe';
import { ApplicationModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
    createConnections().then(async connection => {

        const app = await NestFactory.create(ApplicationModule);

        app.use(cors());
        app.setGlobalPrefix('api');
        app.use(bodyParser.json());
        app.useGlobalPipes(new ValidationPipe());
        app.listen(3002, () => console.log('Application is listening on port 3000.'));

    }).catch(error => console.log('TypeORM connection error: ', error));

}
bootstrap();