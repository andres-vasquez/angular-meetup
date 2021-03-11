import {Inject, Injectable} from '@nestjs/common';
import {FirebaseRepositoryService} from "../repository/firebase-repository.service";
import {filter, map} from "rxjs/operators";
import {RepositoryI} from "../repository/repository-i";
import {CommentModel} from "./comment.model";

@Injectable()
export class CommentService {
    PATH = 'comment';

    constructor(@Inject(FirebaseRepositoryService) private repository: RepositoryI) {
    }

    getAll() {
        return this.repository.getAll(this.PATH);
    }

    getByUuid(uuid: string) {
        return this.repository.getByUuid(this.PATH, uuid);
    }

    create(comment: CommentModel) {
        return this.repository.create(this.PATH, comment).pipe(
            filter((result) => !!result),
            map((uuidGenerated) => {
                    return {
                        uuid: uuidGenerated,
                    };
                },
            ),
        );
    }

    update(uuid: string, comment: CommentModel) {
        return this.repository.update(this.PATH, uuid, comment);
    }

    updateAll(uuid: string, comment: CommentModel) {
        return this.repository.updateAll(this.PATH, uuid, comment);
    }

    delete(uuid: string) {
        return this.repository.delete(this.PATH, uuid);
    }
}
