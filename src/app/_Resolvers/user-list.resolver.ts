import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService,
                private router: Router,
                private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
            // console.log('resolver id' + route.params['id'] +'--routestring--' + route.toString());
            return this.userService.getUsers(this.pageNumber, this.pageSize)
            .pipe(catchError(error => {
                this.alertify.error('Problem retriving user data');
                this.router.navigate(['/home']);
                return of(null);
            }));
        }
    }
