import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/_models/appointment';
import { Patient } from 'src/app/_models/Patient';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { Location, Time, formatDate } from '@angular/common';
import * as moment_ from 'moment';

const moment = moment_;


@Component({
  selector: 'app-AppointmentDetail',
  templateUrl: './AppointmentDetail.component.html',
  styleUrls: ['./AppointmentDetail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
searchText = '';
searchTextMobile = '';
pats: Patient[];
$startApp = '';
$endApp = '';
patient: Patient;
appt: Appointment;
appParams: any = {};
bsConfig: Partial<BsDatepickerConfig>;
momentDateStart: moment_.Moment;
momentDateEnd: moment_.Moment;
  constructor(private patientService: PatientService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.appt = data['appointment'];
      moment.locale('en');
      this.momentDateStart = moment.utc(this.appt.start);
      this.momentDateEnd = moment.utc(this.appt.end);
      this.$startApp = formatDate(this.appt.start, 'hh:mm', 'en-US');
      this.$endApp = formatDate(this.appt.end, 'hh:mm','en-US');
   });
  }
  updateAppointment() {
    console.log('going to update rec');
    this.patientService.UpdateAppointment(this.appt.id, this.appt).subscribe(next => {
      console.log(next);
      this.alertify.success('Appointment updated');
      this.editForm.reset(this.appt);
    }, error => {
      this.alertify.error(error.error);
      console.error(error);
    });
    }
    loadPatient() {
      this.patientService.getPatient(this.appt.patientId).subscribe( p => this.patient = p);
    }
    backButton() {
      this.location.back();
    }
    startTimeChanged(time: string) {
      const splitted = time.split(':');
      const hour = splitted[0];
      const minute = splitted[1];
      console.log('split :' + hour + ' and ' + minute);
      // tslint:disable-next-line: radix
      this.momentDateStart = this.momentDateStart.set('hour', parseInt(hour));
      // tslint:disable-next-line: radix
      this.momentDateStart = this.momentDateStart.set('minute', parseInt(minute));
      const newDate = this.momentDateStart.toDate();
      this.appt.start = newDate;
      console.log('appt.start' + this.appt.start);
    }
    endTimeChanged(time: string) {
      const splitted = time.split(':');
      const hour = splitted[0];
      const minute = splitted[1];
      // tslint:disable-next-line: radix
      this.momentDateEnd = this.momentDateEnd.set('hour', parseInt(hour));
      // tslint:disable-next-line: radix
      this.momentDateEnd = this.momentDateEnd.set('minute', parseInt(minute));
      const newDate = this.momentDateEnd.toDate();
      this.appt.end = newDate;
      console.log('appt.end' + this.appt.end);
    }
}
