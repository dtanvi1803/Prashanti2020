import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientLookupDataSource } from './patient-lookup-datasource';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-lookup',
  templateUrl: './patient-lookup.component.html',
  styleUrls: ['./patient-lookup.component.css']
})
export class PatientLookupComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Patient>;
  @Input() searchTextName: string;
  @Input() searchTextMobile: string;
  @Output() selectedPatient = new EventEmitter();
  PatientSelected: Patient;
  dataSource: PatientLookupDataSource;
  selectedRow;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'contactNo', 'age', 'city', 'select'];
  /**
   *
   */
  constructor(private patientService: PatientService, private alertify: AlertifyService, private router: Router) {  }
  ngOnInit() {
    this.dataSource = new PatientLookupDataSource(this.patientService);
    this.dataSource.loadPatients(this.searchTextName, this.searchTextMobile);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  selectRow(row) {
    this.selectedRow = row;
    this.PatientSelected = row;
    this.selectedPatient.emit(this.PatientSelected);
}
createPatient() {
  this.patientService.createPatient().subscribe((next: Patient) => {
    this.alertify.success('Patient Added');
    this.router.navigate(['/lstpatients/edit', next.id]);
  });
}
}
