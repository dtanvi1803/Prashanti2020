/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyDateTimePickerComponent } from './MyDateTimePicker.component';

describe('MyDateTimePickerComponent', () => {
  let component: MyDateTimePickerComponent;
  let fixture: ComponentFixture<MyDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
