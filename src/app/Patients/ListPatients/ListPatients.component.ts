import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ListPatients',
  templateUrl: './ListPatients.component.html',
  styleUrls: ['./ListPatients.component.css']
})
export class ListPatientsComponent implements OnInit {

  constructor(private patientService: PatientService, 
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }
  patients: Patient[];
  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.patients = data['patients'];
    // });
  }

}
