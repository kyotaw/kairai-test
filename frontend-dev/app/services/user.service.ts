import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { KairaiApiService} from './kairai-api.service';
import { User } from '../models/user.model';

export interface UserServiceDelegate {
    loggedIn(user: User): void;
    loggedOut(user: User): void;
}

@Injectable()
export class UserService {

    delegates: UserServiceDelegate[] = [];

    constructor(
        private kairaiApi: KairaiApiService
    ) {}

    login(email: string, password: string) {
        return this.kairaiApi.login(email, password).map(json => {
            let data = json['data'];
            data.email = email;
            const user = this._createUser(data);
            for (let delegate of this.delegates) {
                delegate.loggedIn(user);
            }
            return user;
        });
    }

    logout() {
        const user = this.getUser();
        if (user) {
            localStorage.removeItem('currentUser');
            for (let delegate of this.delegates) {
                delegate.loggedOut(user);
            }
        }
    }
    
    signUp(email: string, password: string) {
        return this.kairaiApi.createUser(email, password).map(json => {
            return this._createUser(json['data']);
        });
    }

    getUser() {
        const json = localStorage.getItem('currentUser');
        if (json) {
            const user = JSON.parse(json);
            return this._createUser(user);
        } else {
            return null;
        }
    }

    addListner(delegate: UserServiceDelegate) {
        this.delegates.push(delegate);
    }

    _createUser(json: any) {
        const user = new User(json.email, json.accessToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
}
