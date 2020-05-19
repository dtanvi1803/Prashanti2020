import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitDetail } from 'src/app/_models/visitDetails';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/Patient';

@Component({
  selector: 'app-VisitDetailsList',
  templateUrl: './VisitDetailsList.component.html',
  styleUrls: ['./VisitDetailsList.component.css']
})
export class VisitDetailsListComponent implements OnInit {
@Input() patient: Patient;
@Input() visits: VisitDetail[];
pagination: Pagination;
VisitParams: any = {};
visitToCreate: VisitDetail;
  constructor(private patientService: PatientService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.visits = data['visit'].result;
    //   this.pagination = data['visit'].pagination;  });
  }
  loadVisits() {
    this.patientService.getVisits(this.patient.id).subscribe(res => {
      // this.visits = res.result;
      // this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadVisits();
  }
  createdVisit() {
    // const visit1: VisitDetail =  {
    //     id : 0,
    //     visitDate : new Date(),
    //     findings: '',
    //     complaints: '',
    //     condition: '',
    //     advise : '',
    //     prescription: '',
    //     patientId : this.patient.id};

    this.patientService.AddVisitForPatient(this.patient.id).subscribe((next: VisitDetail) => {
      this.alertify.success('Visit Added');
      this.router.navigate(['/lstpatients/visits/', next.id]);
    }, error => {
      this.alertify.error(error);
    });
  }
}
