import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,MatDateFormats} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatCalendar} from '@angular/material/datepicker';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { User } from 'src/app/_models/user';

const moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-Scheduler',
  templateUrl: './Scheduler.component.html',
  styleUrls: ['./Scheduler.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class SchedulerComponent {
  @ViewChild('calendar', {static : true}) calendar: MatCalendar<_moment.Moment>;
  user: User = JSON.parse(localStorage.getItem('user'));
selectedDate: _moment.Moment;
  date = new FormControl(moment());
  minDate = new Date();
  maxDate = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000);
  displayDate = this.minDate;
  constructor() {}
  dateSelected(value: _moment.Moment) {
    alert(value);
  }

}
