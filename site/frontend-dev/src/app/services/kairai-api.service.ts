import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class KairaiApiService {

    private readonly baseUrl = 'http://localhost:6171/api/';

    constructor(private http: HttpClient) {}

    getDataSources(): Observable<Object> {
        const endPoint = this.baseUrl + 'data_sources';
        return this.http.get(endPoint); 
    }

}
