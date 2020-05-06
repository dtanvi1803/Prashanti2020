import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-PatientPortal',
  templateUrl: './PatientPortal.component.html',
  styleUrls: ['./PatientPortal.component.css']
})
export class PatientPortalComponent implements OnInit {
  registerMode = false;
  panelOpenState = false;
  constructor(public authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  model: any = {};
  photoUrl: string;
  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged in succesfull');
    }, error => {
      this.alertify.error(error);
    },() => {
      this.router.navigate(['/listpatients']);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  registerToggle() {
    this.registerMode = true;
  }
  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }
}
