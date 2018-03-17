import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { KairaiApiService} from './kairai-api.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(
        private kairaiApi: KairaiApiService
    ) {}

    login(email: string, password: string) {
        return this.kairaiApi.login(email, password).map(json => {
                return this._createUser(email, json);
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
    
    signUp(email: string, password: string) {
        return this.kairaiApi.createUser(email, password).map(json => {
            return this._createUser(email, json);
        });
    }

    _createUser(email, json: any) {
        const user = new User(email, json.data.accessToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
}
