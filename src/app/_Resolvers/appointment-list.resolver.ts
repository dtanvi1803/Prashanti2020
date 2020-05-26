import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';
import { User } from '../_models/user';

@Injectable()
export class AppointmentListResolver implements Resolve<Appointment[]> {
    pageNumber = 1;
    pageSize = 5;
    user: User = JSON.parse(localStorage.getItem('user'));

    constructor(private patientService: PatientService,
                private router: Router,
                private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Appointment[]> {
            console.log('resolver id patient list' + route.params['id'] + '--routestring--' + route.toString());
            return this.patientService.getAppointments(this.user.id, route.params['date'], this.pageNumber, this.pageSize)
            .pipe(catchError(error => {
                this.alertify.error('Propblem retriving Patient data');
                this.router.navigate(['/home']);
                return of(null);
            }));
        }

    }
