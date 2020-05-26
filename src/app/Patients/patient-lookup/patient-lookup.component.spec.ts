import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { PatientLookupComponent } from './patient-lookup.component';

describe('PatientLookupComponent', () => {
  let component: PatientLookupComponent;
  let fixture: ComponentFixture<PatientLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientLookupComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
