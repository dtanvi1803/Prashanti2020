import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Patient } from '../_models/Patient';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PatientListResolver implements Resolve<Patient[]> {
    constructor(private patientService: PatientService,
                private router: Router,
                private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Patient[]> {
            // console.log('resolver id' + route.params['id'] +'--routestring--' + route.toString());
            return this.patientService.getPatients()
            .pipe(catchError(error => {
                this.alertify.error('Propblem retriving user data');
                this.router.navigate(['/home']);
                return of(null);
            }));
        }

    }
