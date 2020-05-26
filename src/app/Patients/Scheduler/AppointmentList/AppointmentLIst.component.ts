import { Component, OnInit, Input } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/_services/patient.service';
import { User } from 'src/app/_models/user';
import { Appointment } from 'src/app/_models/appointment';

@Component({
  selector: 'app-AppointmentLIst',
  templateUrl: './AppointmentLIst.component.html',
  styleUrls: ['./AppointmentLIst.component.css']
})
export class AppointmentLIstComponent implements OnInit {
appDate: Date;
appts: Appointment[];
pagination: Pagination;
user: User = JSON.parse(localStorage.getItem('user'));
appParams: any = {};
  constructor(private patientService: PatientService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.appDate = this.route.params['date'];
    this.route.data.subscribe(data => {
      this.appts = data['appointments'].result;
      this.pagination = data['appointments'].pagination;
   });
   console.log(this.appts);
    this.appParams.Status = 'Pending';
    this.appParams.orderBy = 'Start';    
  }
  resetFilters() {
    this.appParams.Status = 'Pending';
    this.appParams.orderBy = 'Start';
    this.appParams.AppointmentDate = this.appDate; 
    this.loadAppointments();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAppointments();
  }
  loadAppointments() {
    this.patientService
      .getAppointments(this.user.id, this.appDate, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Appointment[]>) => {
      this.appts = res.result;
      this.pagination = res.pagination;
        }, error => {
      this.alertify.error(error);
      });
  }
  createAppointment() {
    this.patientService.AddAppointment(this.user.id).subscribe((next: Appointment) => {
      this.alertify.success('Appointment Added');
      this.router.navigate(['/listusers/schedule/edit/', next.id]);
    });
  }
}
