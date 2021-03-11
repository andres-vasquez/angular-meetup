import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CommentController} from './comment/comment.controller';
import {CommentService} from './comment/comment.service';
import {FirebaseRepositoryService} from "./repository/firebase-repository.service";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
    ],
    controllers: [
        AppController,
        CommentController
    ],
    providers: [
        AppService,
        FirebaseRepositoryService,
        CommentService
    ],
})
export class AppModule {
}
