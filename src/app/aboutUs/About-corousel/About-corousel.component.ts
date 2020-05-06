import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-About-corousel',
  templateUrl: './About-corousel.component.html',
  styleUrls: ['./About-corousel.component.css']
})
export class AboutCorouselComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    slides = [
      {id: 1, image: '../../../assets/clinic/111.jpg'},
      {id: 2, image: '../../../assets/clinic/113.jpg'},
      {id: 3, image: '../../../assets/clinic/114.jpg'},
      {id: 4, image: '../../../assets/clinic/3.jpg'},
      {id: 4, image: '../../../assets/clinic/4.jpg'},
      {id: 4, image: '../../../assets/clinic/5.jpg'},
      {id: 4, image: '../../../assets/clinic/5.jpg'},
      {id: 4, image: '../../../assets/clinic/7.jpg'},                        
      {id: 5, image: '../../../assets/clinic/8.jpg'}
  ];    
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
