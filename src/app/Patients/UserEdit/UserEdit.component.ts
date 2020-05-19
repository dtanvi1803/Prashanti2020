import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-UserEdit',
  templateUrl: './UserEdit.component.html',
  styleUrls: ['./UserEdit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  bsConfig: Partial<BsDatepickerConfig>;
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'YYYY-MM-DD'
    };    
    this.initializeUploader();
  }

  updateUser() {
    this.userService.UpdateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
//
initializeUploader() {
  this.uploader = new FileUploader({
    url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid,
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
      console.log(item);
      console.log(status);
      this.user.photoUrl = item.url;
    }
  };
  this.uploader.onWhenAddingFileFailed = () => {console.log('on when adding failed fired')};
}

 fileOverBase(e: any): void {
   console.log('file over base fired');
   this.hasBaseDropZoneOver = e;
}
}
