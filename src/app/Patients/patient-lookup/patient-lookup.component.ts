import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientLookupDataSource } from './patient-lookup-datasource';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';

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
  dataSource: PatientLookupDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  /**
   *
   */
  constructor(private patientService : PatientService) {  }
  ngOnInit() {
    this.dataSource = new PatientLookupDataSource(this.patientService);
    this.dataSource.loadPatients(this.searchTextName, this.searchTextMobile);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
