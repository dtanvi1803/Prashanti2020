import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/Patient';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-PatientEdit',
  templateUrl: './PatientEdit.component.html',
  styleUrls: ['./PatientEdit.component.css']
})
export class PatientEditComponent implements OnInit {
  patient: Patient;
  @ViewChild('editForm', {static: true}) editForm:NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, 
              private alertify: AlertifyService,
              private patientService: PatientService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.patient = data['patient'];
  });
  }
  updatePatient() {
    this.patientService.UpdatePatient(+this.route.snapshot.params['id'], this.patient).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.patient);
    }, error => {
      this.alertify.error(error);
    });
  }
}
