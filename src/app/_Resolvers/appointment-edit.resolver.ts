import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';

@Injectable()
export class AppointmentEditResolver implements Resolve<Appointment> {
    constructor(private patientService: PatientService,
                private activeRoute: ActivatedRoute,
                private route: Router,
                private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Appointment> {
            return this.patientService.getAppointment(route.params['id'])
            .pipe(catchError(error => {
                this.alertify.error('Propblem retriving Appointment Edit data');
                this.route.navigate(['/listusers/schedule']);
                return of(null);
            }));
        }
    }
