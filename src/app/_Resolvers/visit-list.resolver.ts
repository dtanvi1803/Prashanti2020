import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VisitDetail } from '../_models/visitDetails';

@Injectable()
export class VisitListResolver implements Resolve<VisitDetail> {

pageNumber = 1;
pageSize = 5;
constructor(private patientService: PatientService,
            private router: Router,
            private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<VisitDetail> {
        console.log('resolver id' + route.params['id'] + '--routestring--' + route.toString());
        return this.patientService.getVisit(route.params['id'])
        .pipe(catchError(error => {
            this.alertify.error('Propblem retriving visit data');
            console.error(error);
            this.router.navigate(['/lstpatients']);
            return of(null);
        }));
    }
}
