import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../_models/Patient';
import { VisitDetail } from 'src/app/_models/visitDetails';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { PatientService } from '../../_services/patient.service';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { isNullOrUndefined } from 'util';

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
  bsConfig: Partial<BsDatepickerConfig>;

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
    // tis.route.data.subscribe(data => {
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
  this.visit = Object.assign({}, this.editForm.value);
  this.editForm.reset();
  this.visit.id = 0;
}
updateVisit() {
  console.log('going to update visit logic');
  if (this.visitId <= 0) {
    console.log('going to new rec');
    this.visit.patientId = this.patientId;
    this.patientService.AddVisitForPatient(this.visit).subscribe(next => {
      this.alertify.success('Visit Added');
      this.editForm.reset(this.visit);
    }, error => {
      this.alertify.error(error);
      console.error(error);
    });
  } else {
  console.log('going to update rec');
  this.patientService.UpdateVisit(this.visitId, this.visit).subscribe(next => {
    console.log(next);
    this.alertify.success('Visit udated');
    this.editForm.reset(this.visit);
  }, error => {
    this.alertify.error(error.error);
    console.error(error);
  });
  }
 }
}
