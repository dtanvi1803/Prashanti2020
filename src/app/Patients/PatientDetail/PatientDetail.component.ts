import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { VisitDetail } from 'src/app/_models/visitDetails';

@Component({
  selector: 'app-PatientDetail',
  templateUrl: './PatientDetail.component.html',
  styleUrls: ['./PatientDetail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  visits : VisitDetail[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private patientService: PatientService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.patient = data['patient'];
    });
    console.log('patient ' + this.patient.reports.length);
    this.visits = this.patient.visitDetails;
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns : 4,
        imageAnimation : NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getReports( );
    console.log('galleryimages' + this.galleryImages);
  }
  getReports() {
    const reportUrls = [];
    for (const rep of this.patient.reports) {
      reportUrls.push({
        small: rep.url,
        medium: rep.url,
        big: rep.url
    })
    }
    return reportUrls;
  }
}
