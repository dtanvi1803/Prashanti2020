import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.Interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { MentalIllnessComponent } from './MentalIllness/MentalIllness.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ListPatientsComponent } from './Patients/ListPatients/ListPatients.component';
import { UserListComponent } from './Patients/UserList/UserList.component';
import { PatientCardComponent } from './Patients/PatientCard/PatientCard.component';
import { UserCardComponent } from './Patients/UserCard/UserCard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserDetailComponent } from './Patients/userDetail/userDetail.component';
import { PatientDetailComponent } from './Patients/PatientDetail/PatientDetail.component';
import { UserDetailResolver } from './_Resolvers/user-detail.resolver';
import { UserListResolver } from './_Resolvers/user-list.resolver';
import { PatientListResolver } from './_Resolvers/patient-list.resolver';
import { PatientDetailResolver } from './_Resolvers/patient-detail.resolver';
import { UserEditComponent } from './Patients/UserEdit/UserEdit.component';
import { UserEditResolver } from './_Resolvers/user-edit.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PatientEditComponent } from './Patients/PatientEdit/PatientEdit.component';
import { PatientPreventUnsavedChanges } from './_guards/patient-prevent-unsaved-changes.guard';
import { PatientEditResolver } from './_Resolvers/patient-edit.resolver';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      AboutUsComponent,
      ContactUsComponent,
      MentalIllnessComponent,
      ListPatientsComponent,
      UserListComponent,
      PatientCardComponent,
      UserCardComponent,
      UserDetailComponent,
      PatientDetailComponent,
      UserEditComponent,
      PatientCardComponent,
      PatientEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AuthGuard,
      PreventUnsavedChanges,
      PatientPreventUnsavedChanges,
      UserDetailResolver,
      UserListResolver,
      PatientListResolver,
      PatientDetailResolver,
      UserEditResolver,
      PatientEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
