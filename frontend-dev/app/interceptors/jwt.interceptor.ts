import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtIterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.accessToken) {
            const token = `Bearer ${user.accessToken}`;
            const newReq = request.clone({setHeaders: {Authorization: token}});
            return next.handle(newReq);
        } else {
            return next.handle(request);
        }
    }

}
