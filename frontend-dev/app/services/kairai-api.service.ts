import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class KairaiApiService {

    private readonly baseUrl = environment.APISERVER_URL + 'api/';

    constructor(private http: HttpClient) {}

    getMonos(): Observable<Object> {
        const url = this.baseUrl + 'monos';
        return this._get(url);
    }

    getDataSources(): Observable<Object> {
        const url = this.baseUrl + 'data_sources';
        return this._get(url);
    }

    getChannel(channelId: string): Observable<Object> {
        const url = this.baseUrl + 'channels/' + channelId;
        return this._get(url);
    }

    createUser(email: string, password: string) {
        const url = this.baseUrl + 'users';
        return this.http.post(url, {email: email, password: password});
    }

    login(email: string, password: string) {
        const url = this.baseUrl + 'auth/login';
        return this._get(url, {email: encodeURIComponent(email), password: encodeURIComponent(password)});
    }

    isLoggedIn(accessToken: string) {
        const url = this.baseUrl + 'auth/loggedin';
        return this._get(url, { accessToken: accessToken });
    }

    socialLogin(socialSystem: string) {
    const url = 'https://kairai.herokuapp.com/api/auth/' + socialSystem + '/login';
        return this._get(url);
    }

    updatePassword(curPassword: string, newPassword: string) {
        const url = this.baseUrl + 'users/password';
        return this.http.put(url, {currentPassword: curPassword, newPassword: newPassword});
    }

    _get(url, params={}): Observable<Object> {
        const options = {
            params: params,
            withCredentials: true
        }
        return this.http.get(url, options);
    }
}
