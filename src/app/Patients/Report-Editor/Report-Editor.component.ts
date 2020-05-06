import { Component, OnInit, Input } from '@angular/core';
import { Report } from 'src/app/_models/report';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../_models/Patient';
import { PatientService } from '../../_services/patient.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-Report-Editor',
  templateUrl: './Report-Editor.component.html',
  styleUrls: ['./Report-Editor.component.css']
})
export class ReportEditorComponent implements OnInit {
@Input() reports: Report[];
patient: Patient;

uploader: FileUploader;
hasBaseDropZoneOver = false;
baseUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.patient = data['patients'];
      });
    this.initializeUploader();

  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'patients/' + this.patient.id + '/reports',
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
        const res: Report = JSON.parse(response);
        const report = {
          id: res.id,
          url: res.url,
          reportAdded : res.reportAdded,
          description: res.description,
          read : res.read
        };
        this.reports.push(report);
      }
    };
    this.uploader.onWhenAddingFileFailed = () => {console.log('on when adding failed fired')};
  }

   fileOverBase(e: any): void {
     console.log('file over base fired');
     this.hasBaseDropZoneOver = e;
  }

  setReportRead(report: Report) {
    this.patientService.SetReportRead(this.patient.id, report.id).subscribe(() => {
      console.log("Successfully toggle read");
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteReport(id: number) {
    this.alertify.confirm('Are you sure you want to delete the report ?', () => {
      this.patientService.deleteReport(this.patient.id,id).subscribe(() => {
        this.reports.splice(this.reports.findIndex(r => r.id === id), 1);
        this.alertify.success('Report has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the report');
      });
    });
  }
}
