import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Patient } from '../_models/patient';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { VisitDetail } from '../_models/visitDetails';
import { VisitDetailCardComponent } from '../Patients/VisitDetailCard/VisitDetailCard.component';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getPatients(page?, itemsPerPage?, patientParams?): Observable<PaginatedResult<Patient[]>> {
  const paginatedResult: PaginatedResult<Patient[]> = new PaginatedResult<Patient[]>();

  let params = new HttpParams();
  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  if (patientParams != null) {
    params = params.append('lastVisitFromDays', patientParams.lastVisitFromDays);
    params = params.append('lastVisitToDays', patientParams.lastVisitToDays);
    params = params.append('clinicId', patientParams.clinicId);
    params = params.append('orderBy', patientParams.orderBy);
  }

  return this.http.get<Patient[]>(this.baseUrl + 'patients', { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}
getPatient(id: number): Observable<Patient> {
  return this.http.get<Patient>(this.baseUrl + 'patients/' + id );
}
UpdatePatient(id: number, patient: Patient) {
  return this.http.put(this.baseUrl + 'patients/' + id, patient);
}
SetReportRead(patientId: number, id: number) {
  return this.http.put(this.baseUrl  + 'patients/' + patientId + '/reports/' + id + '/setRead', {} );
}
deleteReport(patientId: number, id: number) {
  return this.http.delete(this.baseUrl + 'patients/' + patientId + '/reports/' + id);
}
getVisits(id: number) {
  return this.http.get<VisitDetail[]>(this.baseUrl + 'patients/visits/' + id);
}
getVisit(id: number): Observable<VisitDetail> {
  return this.http.get<VisitDetail>(this.baseUrl + 'patients/visits/' + id);
}
UpdateVisit(id: number, visit: VisitDetail) {
  return this.http.put(this.baseUrl + 'patients/visits/' + id, visit);
}
AddVisitForPatient(visit: VisitDetail) {
  return this.http.post(this.baseUrl + 'patients/visits/createVisit', visit);
}
}
