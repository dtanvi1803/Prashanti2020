import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../_models/Patient';
import { VisitDetail } from 'src/app/_models/visitDetails';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { PatientService } from '../../_services/patient.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-VisitDetailsEdit',
  templateUrl: './VisitDetailsEdit.component.html',
  styleUrls: ['./VisitDetailsEdit.component.css']
})
export class VisitDetailsEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  patient: Patient;
  visit: VisitDetail;
  visitId: number;
  patientId: number;

  constructor(private route: ActivatedRoute, 
              private alertify: AlertifyService,
              private patientService: PatientService) { }

  ngOnInit() {
    this.visitId = +this.route.snapshot.paramMap.get('id');
    // this.route.parent.params.subscribe( params => {
    //   this.patientId = +params['id'];
    // });
    this.loadVisits();
    // this.patientId = this.visit.patientId;
    // console.log('snapshot visit' + this.visitId + ' patientid ' + this.patientId);
    //this.loadPatient();
    // this.route.data.subscribe(data => {
    //   console.log(data);
    //   this.visit = data['visit'];
    //   console.log('visit in data ngoinit' + this.visit);
    // });
  }
loadVisits() {
  this.patientService.getVisit(this.visitId).subscribe( v => {
    this.visit = v;
    this.patientId = v.patientId;
    this.patientService.getPatient(this.patientId).subscribe( p => this.patient = p);
  });
}
loadPatient() {
  this.patientService.getPatient(this.patientId).subscribe( p => this.patient = p);
}
ResetForm() {
  this.editForm.reset();
}
updateVisit() {
  if (this.visitId == null) {
    this.patientService.AddVisit(this.visit).subscribe(next => {
      this.alertify.success('Visit Added');
      this.editForm.reset(this.visit);
    }, error => {
      this.alertify.error(error);
    });
  } else {
  this.patientService.UpdateVisit(this.visitId, this.patientId, this.visit).subscribe(next => {
    this.alertify.success('Visit udated');
    this.editForm.reset(this.visit);
  }, error => {
    this.alertify.error(error);
  });
  }
}
}
