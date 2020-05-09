import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Patient } from '../_models/Patient';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VisitDetailsEditComponent } from '../Patients/VisitDetailsEdit/VisitDetailsEdit.component';
import { VisitDetail } from '../_models/visitDetails';
import { VisitDetailCardComponent } from '../Patients/VisitDetailCard/VisitDetailCard.component';

@Injectable()
export class PatientListResolver implements Resolve<Patient[]> {
    pageNumber = 1;
    pageSize = 5;
    
    constructor(private patientService: PatientService,
                private router: Router,
                private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Patient[]> {
            console.log('resolver id patient list' + route.params['id'] + '--routestring--' + route.toString());
            return this.patientService.getPatients(this.pageNumber, this.pageSize)
            .pipe(catchError(error => {
                this.alertify.error('Propblem retriving Patient data');
                this.router.navigate(['/home']);
                return of(null);
            }));
        }

    }
