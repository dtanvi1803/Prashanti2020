import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PatientService } from 'src/app/_services/patient.service';
import { Patient } from 'src/app/_models/Patient';
import { NgForm } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { VisitDetail } from 'src/app/_models/visitDetails';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-PatientEdit',
  templateUrl: './PatientEdit.component.html',
  styleUrls: ['./PatientEdit.component.css']
})
export class PatientEditComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  patient: Patient;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  bsConfig: Partial<BsDatepickerConfig>;
  
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, 
              private alertify: AlertifyService,
              private patientService: PatientService,
              private router: Router,
              private location: Location) { }

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
    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'YYYY-MM-DD'
    };
    this.initializeUploader();
  }
  getReports() {
    const imageUrls = [];
    for(let i = 0; i < this.patient.reports.length; i++) {
      imageUrls.push({
        small: this.patient.reports[i].url,
        medium: this.patient.reports[i].url,
        big: this.patient.reports[i].url,
        description: this.patient.reports[i].description,
        read: this.patient.reports[i].read
      });
    }
    return imageUrls;
  }
  updatePatient() {
    this.patient.clinicId = this.user.clinicId;
    this.patientService.UpdatePatient(+this.route.snapshot.params['id'], this.patient).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.patient);
    }, error => {
      this.alertify.error(error);
    });
  }
  createdVisit() {
    this.patientService.AddVisitForPatient(this.patient.id).subscribe((next: VisitDetail) => {
      this.alertify.success('Visit Added');
      this.router.navigate(['/lstpatients/visits/', next.id]);
    }, error => {
      this.alertify.error(error);
    });
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'patients/' + this.patient.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.patient.photoUrl = response;
      }
    };
    this.uploader.onWhenAddingFileFailed = () => {console.log('on when adding failed fired')};
  }
   fileOverBase(e: any): void {
     console.log('file over base fired');
     this.hasBaseDropZoneOver = e;
  }
  backClicked() {
    this.location.back();
  }
}
