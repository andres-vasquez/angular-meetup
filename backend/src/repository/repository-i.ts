import {Observable} from "rxjs";

export interface RepositoryI {
    getAll(path: string): Observable<Array<any>>;

    getByUuid(path: string, uuid: string): Observable<any>;

    create(path: string, obj: any): Observable<string>;

    update(path: string, uuid: string, obj: any): Observable<boolean>;

    updateAll(path: string, uuid: string, obj: any): Observable<boolean>;

    delete(path: string, uuid: string): Observable<boolean>;
}