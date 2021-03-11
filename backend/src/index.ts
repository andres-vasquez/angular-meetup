import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as express from "express";
import * as functions from 'firebase-functions';
import {AppModule} from 'src/app.module';

const server = express();

export const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );

    const corsOptions = {
        methods: 'GET, POST, PATCH, PUT',
        preflightContinue: true,
        optionsSuccessStatus: 204,
        credentials: true,
        origin: [
            'http://localhost:4200/',
            'http://localhost:4200',
            'https://angular-meetup-10dbb.web.app/',
            'https://angular-meetup-10dbb.web.app'
        ]
    };

    app.enableCors(corsOptions);
    return app.init();
};

createNestServer(server)
    .then(v => console.log('Nest Ready'))
    .catch(err => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
