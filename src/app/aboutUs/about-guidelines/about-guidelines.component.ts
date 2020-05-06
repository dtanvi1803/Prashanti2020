import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-guidelines',
  templateUrl: './about-guidelines.component.html',
  styleUrls: ['./about-guidelines.component.css']
})
export class AboutGuidelinesComponent implements OnInit {
  step = 5;
  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
