import { Component, OnInit, Input } from '@angular/core';
import { VisitDetail } from '../../_models/visitDetails';
import { Patient } from '../../_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-VisitDetailCard',
  templateUrl: './VisitDetailCard.component.html',
  styleUrls: ['./VisitDetailCard.component.css']
})
export class VisitDetailCardComponent implements OnInit {
@Input() visit: VisitDetail;
@Input() patient: Patient;
  constructor(private patientService: PatientService,
              private route: Router,
    ) { }

  ngOnInit() {
  }
  GetVisit(visitId) {
    this.patientService.getVisit(visitId).subscribe((visit: VisitDetail) => {
      this.visit = visit;
      // this.route.navigate(['/lstpatients/visits/', visit.id]);
    });
  }

}
