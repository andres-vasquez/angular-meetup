import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as admin from 'firebase-admin';
import {from, Observable, of, zip} from 'rxjs';
import {concatMap, flatMap, map, toArray} from 'rxjs/operators';
import {RepositoryI} from "./repository-i";

@Injectable()
export class FirebaseRepositoryService implements RepositoryI {
    firebaseApp: admin.app.App;

    constructor(private configService: ConfigService) {
        const admin = require("firebase-admin");

        const firebaseServiceAccount = this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT');
        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(firebaseServiceAccount)
        });
    }

    getAll(path: string): Observable<Array<any>> {
        return from(this.firebaseApp.firestore().collection(path).get()).pipe(
            flatMap(documents => documents.docs),
            concatMap((document) => {
                const obj = document.data();
                obj.uuid = document.id;
                return of(obj);
            }),
            toArray(),
        );
    }

    getByUuid(path: string, uuid: string): Observable<any> {
        return from(this.firebaseApp.firestore().collection(path).doc(uuid).get()).pipe(
            map((document) => {
                const obj = document.data();
                if (!obj) {
                    return null;
                }

                obj.uuid = document.id;
                return obj;
            }),
        );
    }

    create(path: string, obj: any): Observable<string> {
        return from(this.firebaseApp.firestore().collection(path).add(obj)).pipe(
            map((document) => document.id),
        );
    }

    update(path: string, uuid: string, obj: any): Observable<boolean> {
        return from(this.firebaseApp.firestore().collection(path).doc(uuid).update(obj)).pipe(
            map(() => true),
        );


    }

    updateAll(path: string, uuid: string, obj: any): Observable<boolean> {
        return from(this.firebaseApp.firestore().collection(path).doc(uuid).set(obj, {merge: false})).pipe(
            map(() => true),
        );
    }

    delete(path: string, uuid: string): Observable<boolean> {
        return from(this.firebaseApp.firestore().collection(path).doc(uuid).delete()).pipe(
            map(() => true),
        );
    }
}
