import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/_models/Patient';
import { PatientService } from 'src/app/_services/patient.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryComponent, NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { VisitDetail } from 'src/app/_models/visitDetails';

@Component({
  selector: 'app-PatientDetail',
  templateUrl: './PatientDetail.component.html',
  styleUrls: ['./PatientDetail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  visits: VisitDetail[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild(NgxGalleryComponent, {static: true}) ngxGalleryComponent;

  constructor(private patientService: PatientService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.patient = data['patient'];
    });
    this.visits = this.patient.visitDetails.sort((a, b) => {
      return <any>new Date(b.visitDate) - <any>new Date(a.visitDate);
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns : 4,
        imageAnimation : NgxGalleryAnimation.Slide,
        preview: true,
        previewDescription: true,
        previewFullscreen : true,
        previewCloseOnEsc : true
      }
    ];
    this.galleryImages = this.getReports( ).sort((a, b) => {
      return <any>new Date(b.reportAdded) - <any>new Date(a.reportAdded);
    });
  }

  getReports() {
    const reportUrls = [];
    for (const rep of this.patient.reports) {
      reportUrls.push({
        small: rep.url,
        medium: rep.url,
        big: rep.url,
        description: rep.description,
        detail: rep.details,
        read: rep.read,
        remark: rep.remark,
        dateAdded: rep.reportAdded
    });
    }
    return reportUrls;
  }
}
