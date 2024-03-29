import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {}

  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You shall not pass!!');
    this.router.navigate(['/home']);
    return false;
  }
}
