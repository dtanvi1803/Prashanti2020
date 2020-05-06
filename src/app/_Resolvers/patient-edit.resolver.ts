import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Patient } from '../_models/Patient';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PatientEditResolver implements Resolve<Patient> {
    constructor(private patientService: PatientService,
                private activeRoute: ActivatedRoute,
                private route: Router,
                private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Patient> {
            return this.patientService.getPatient(route.params['id'])
            .pipe(catchError(error => {
                this.alertify.error('Propblem retriving Patient data');
                this.route.navigate(['/lstpatients']);
                return of(null);
            }));
        }
    }
