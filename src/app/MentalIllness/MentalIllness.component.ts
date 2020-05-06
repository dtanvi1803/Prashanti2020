import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-MentalIllness',
  templateUrl: './MentalIllness.component.html',
  styleUrls: ['./MentalIllness.component.css']
})
export class MentalIllnessComponent implements OnInit {
  step = 0;
  showAnxiety = false;
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
