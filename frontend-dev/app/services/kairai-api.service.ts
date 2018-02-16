import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class KairaiApiService {

    private readonly baseUrl = environment.APISERVER_URL + 'api/';

    constructor(private http: HttpClient) {}

    getDataSources(): Observable<Object> {
        const url = this.baseUrl + 'data_sources';
        return this._get(url);
    }

    getChannel(channelId: string): Observable<Object> {
        const url = this.baseUrl + 'channels/' + channelId;
        return this._get(url);
    }

    socialLogin(socialSystem: string) {
    const url = 'https://kairai.herokuapp.com/api/auth/' + socialSystem + '/login';
        return this._get(url);
    }

    _get(url): Observable<Object> {
        return this.http.get(url, { withCredentials:true });
    }
}
