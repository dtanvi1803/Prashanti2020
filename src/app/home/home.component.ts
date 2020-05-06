import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          // { title: 'Card 1', cols: 2, rows: 1, displayTitle: 'Prashanti Clinic' },
          { title: 'Card 2', cols: 2, rows: 1, displayTitle: 'PATIENT GUIDELINES' },
          { title: 'Card 3', cols: 2, rows: 1 , displayTitle: 'SURAT'},
          { title: 'Card 4', cols: 2, rows: 1 , displayTitle: 'VALSAD'},
          { title: 'Card 5', cols: 2, rows: 1 , displayTitle: 'SERVICES WE PROVIDE'},
          { title: 'Card 6', cols: 2, rows: 1 , displayTitle: 'FROM OUR EXPERTS'},
          // { title: 'Card 7', cols: 2, rows: 1 , displayTitle: 'Registration for doctors'}
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1, displayTitle: 'Prashanti Clinic' },
        { title: 'Card 2', cols: 1, rows: 1, displayTitle: 'PATIENT GUIDELINES' },
        { title: 'Card 3', cols: 1, rows: 1 , displayTitle: '@ SURAT'},
        { title: 'Card 4', cols: 1, rows: 1 , displayTitle: '@ VALSAD'},
        { title: 'Card 5', cols: 1, rows: 1 , displayTitle: 'SERVICES WE PROVIDE'},
        { title: 'Card 6', cols: 1, rows: 1 , displayTitle: 'FROM OUR EXPERTS'},
      //  { title: 'Card 7', cols: 1, rows: 1 , displayTitle: 'REGISTRATION'}
    ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
