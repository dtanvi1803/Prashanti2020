import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/Patient';
import { NgForm } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-PatientEdit',
  templateUrl: './PatientEdit.component.html',
  styleUrls: ['./PatientEdit.component.css']
})
export class PatientEditComponent implements OnInit {
  patient: Patient;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private route: ActivatedRoute, 
              private alertify: AlertifyService,
              private patientService: PatientService) { }

              
  ngOnInit() {
    this.route.data.subscribe(data => {
    this.patient = data['patients'];
  });
    this.galleryOptions = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];
  this.galleryImages = this.getReports();
  }
  getReports() {
    const imageUrls = [];
    for (let i = 0; i < this.patient.reports.length; i++) {
      imageUrls.push({
        small: this.patient.reports[i].url,
        medium: this.patient.reports[i].url,
        big: this.patient.reports[i].url,
        description: this.patient.reports[i].description
      });
    }
    return imageUrls;
  }
  updatePatient() {
    this.patientService.UpdatePatient(+this.route.snapshot.params['id'], this.patient).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.patient);
    }, error => {
      this.alertify.error(error);
    });
  }
}
