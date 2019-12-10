import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../_models/patient';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getPatients(): Observable<Patient[]> {
  return this.http.get<Patient[]>(this.baseUrl + 'patients');
}
getPatient(id: number): Observable<Patient> {
  return this.http.get<Patient>(this.baseUrl + 'patients/' + id );
}
}
