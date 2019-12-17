import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/_models/Patient';

@Component({
  selector: 'app-PatientCard',
  templateUrl: './PatientCard.component.html',
  styleUrls: ['./PatientCard.component.css']
})
export class PatientCardComponent implements OnInit {
  @Input() patient: Patient;
  constructor() { }

  ngOnInit() {
  }
}
