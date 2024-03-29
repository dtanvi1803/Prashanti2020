import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-ListPatients',
  templateUrl: './ListPatients.component.html',
  styleUrls: ['./ListPatients.component.css']
})
export class ListPatientsComponent implements OnInit {
  patients: Patient[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  patientParams: any = {};
  showFilters = false;
  toolTip;
  selectedPatId;
  constructor(private patientService: PatientService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private router: Router) { }
  ngOnInit() {
     this.route.data.subscribe(data => {
       this.patients = data['patients'].result;
       this.pagination = data['patients'].pagination;
    });
     
     this.patientParams.lastVisitFromDays = 30;
     this.patientParams.lastVisitToDays = 1;
     this.patientParams.clinicId = this.user.clinicId;
     this.patientParams.orderBy = 'lastActive';
     this.patientParams.filterName = '';
     this.patientParams.filterMobile = '';

  }
  resetFilters() {
    this.patientParams.lastVisitFromDays = 30;
    this.patientParams.lastVisitToDays = 1;
    this.patientParams.clinicId = this.user.clinicId;
    this.patientParams.orderBy = 'lastActive';
    this.patientParams.filterName = '';
    this.patientParams.filterMobile = '';
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  loadUsers() {
    this.patientService
      .getPatients(this.pagination.currentPage, this.pagination.itemsPerPage, this.patientParams)
      .subscribe((res: PaginatedResult<Patient[]>) => {
      this.patients = res.result;
      this.pagination = res.pagination;
        }, error => {
      this.alertify.error(error);
      });
  }
  createPatient() {
    this.patientService.createPatient().subscribe((next: Patient) => {
      this.alertify.success('Patient Added');
      this.router.navigate(['/lstpatients/edit', next.id]);
    });
  }
  getToolTipData(patId: number, patShorHistory: string, patOngoingMed: string, patDiag: string, patInvest: string): string {
    const tooltip = [];
    this.selectedPatId = patId;
    if (patShorHistory) {
      tooltip.push('Short History :-- ' + patShorHistory) ;
    }
    if (patOngoingMed) {
      tooltip.push('On going Meds :--' + patOngoingMed);
    }
    if (patInvest) {
      tooltip.push('Recent Investigation :--' + patInvest);
    }
    if (patDiag) {
      tooltip.push('Diagnosis :--' + patDiag);
    }
    return(tooltip.join('\n'));
  }
}
