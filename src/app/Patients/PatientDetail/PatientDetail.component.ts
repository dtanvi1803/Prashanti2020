import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PatientDetail',
  templateUrl: './PatientDetail.component.html',
  styleUrls: ['./PatientDetail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  constructor(private patientService: PatientService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.patient = data['patient'];
    });
  }
}
