import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;

    email = new FormControl('', [Validators.required, Validators.email]);
    password: any = {};

    hide = true;
    hide_confirm = true;
    isSignUp = false;
    hasPassowrdDoNotMatchError = false;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authService.login(this.credentials.username, this.credentials.password)
            .subscribe(
                data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.loading = false;
            });
    }

    validatePassword() {
        this.hasPassowrdDoNotMatchError = this.password.master != this.password.confirm;
    }

    get emailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }

    get passwordDoNotMatchMessage() {
        return "Password do not match";
    }

}
