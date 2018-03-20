import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    password: string;
    errorMessage: string = ' ';

    hide = true;
    hide_confirm = true;
    loading = false;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        // reset login status
        this.userService.logout();
    }

    login() {
        if (this.email.invalid || !this.password) {
            return;
        }
        this.loading = true;
        this.userService.login(this.email.value, this.password)
            .subscribe(user => {
                this.router.navigateByUrl('/sensors');
                this.loading = false;
            },
            error => {
                this.errorMessage = 'Authentication failed'
                this.loading = false;
            });
    }


    get emailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }

}
