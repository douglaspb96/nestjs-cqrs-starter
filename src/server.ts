import { NestFactory } from '@nestjs/core';
import { createConnections } from 'typeorm';
import { ValidationPipe } from './pipe/validation.pipe';
import { ApplicationModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';

function bootstrap() {
    createConnections().then(async () => {

        const app = await NestFactory.create(ApplicationModule);

        app.use(cors());
        app.use('/uploads', express.static(path.resolve('./public/uploads')));
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new ValidationPipe());
        app.listen(3001, () => console.log('Application is listening on port 3001.'));

    }).catch(error => console.log('TypeORM connection error: ', error));

}
bootstrap();