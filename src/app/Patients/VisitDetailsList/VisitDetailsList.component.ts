import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { VisitDetail } from 'src/app/_models/visitDetails';
import { Pagination } from 'src/app/_models/pagination';
import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/Patient';

@Component({
  selector: 'app-VisitDetailsList',
  templateUrl: './VisitDetailsList.component.html',
  styleUrls: ['./VisitDetailsList.component.css']
})
export class VisitDetailsListComponent implements OnInit {
patient: Patient;
visits: VisitDetail[];
pagination: Pagination;
VisitParams: any = {};
  constructor(private patientService: PatientService, 
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.patient = data['patient'];
      this.visits = data['visit'].result;
      this.pagination = data['visit'].pagination;  });
  }
}
