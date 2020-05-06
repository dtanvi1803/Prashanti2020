import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-Services',
  templateUrl: './about-Services.component.html',
  styleUrls: ['./about-Services.component.css']
})
export class AboutServicesComponent implements OnInit {
  step = 0;

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
