import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { User } from 'src/app/_models/user';
import { PaginatedResult } from 'src/app/_models/pagination';


/**
 * Data source for the PatientLookup view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PatientLookupDataSource extends DataSource<Patient> {
  data: Patient[];
  patientParams: any = {};
  paginator: MatPaginator;
  sort: MatSort;
  user: User = JSON.parse(localStorage.getItem('user'));
  constructor(private patientService: PatientService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Patient[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Patient[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  loadPatients(filterName: string, filterMobile: string, sortDirection = 'asc',
               pageIndex = 1, pageSize= '3') {

    this.patientParams.lastVisitFromDays = 0;
    this.patientParams.lastVisitToDays = 0;
    this.patientParams.clinicId = this.user.clinicId;
    this.patientParams.orderBy = 'lastActive';
    this.patientParams.filterName = filterName;
    this.patientParams.filterMobile = filterMobile;
    console.log('in load patients ' + JSON.stringify(this.patientParams));
    this.patientService.getPatients(pageIndex, pageSize, this.patientParams)
    .subscribe((res: PaginatedResult<Patient[]>) => {
      console.log('res' + JSON.stringify(res.result));
      this.data = res.result;
      // this.paginator = res.pagination;
        }, error => {
      console.error(error);
      });
  }
  /**
   * Sort the data (client-side). If you're us-ing server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Patient[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'contactNo': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
