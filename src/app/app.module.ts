import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { TimeAgoPipe } from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';


import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { MaterialModule } from './MaterialModules';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';

import { ErrorInterceptorProvider } from './_services/error.Interceptor';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PatientPreventUnsavedChanges } from './_guards/patient-prevent-unsaved-changes.guard';


import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { MentalIllnessComponent } from './MentalIllness/MentalIllness.component';
import { PatientPortalComponent } from './PatientPortal/PatientPortal.component';
import { MythsComponent } from './myths/myths.component';
import { AboutCorouselComponent } from './aboutUs/About-corousel/About-corousel.component';
import { AboutGuidelinesComponent } from './aboutUs/about-guidelines/about-guidelines.component';
import { AboutServicesComponent } from './aboutUs/about-Services/about-Services.component';

import { MyDateTimePickerComponent } from './MyDateTimePicker/MyDateTimePicker.component';
import { FilterPipe } from './Patients/filter.pipe';

import { ValueComponent } from './value/value.component';

import { SchedulerComponent } from './Patients/Scheduler/Scheduler.component';
import { AppointmentLIstComponent } from './Patients/Scheduler/AppointmentLIst/AppointmentLIst.component';
import { AppointmentDetailComponent } from './Patients/Scheduler/AppointmentDetail/AppointmentDetail.component';
import { AppointmentListResolver } from './_Resolvers/appointment-list.resolver';
import { AppointmentEditResolver } from './_Resolvers/appointment-edit.resolver';
import { PatientLookupComponent } from './Patients/patient-lookup/patient-lookup.component';

import { UserListComponent } from './Patients/UserList/UserList.component';
import { UserCardComponent } from './Patients/UserCard/UserCard.component';
import { UserDetailComponent } from './Patients/userDetail/userDetail.component';
import { UserDetailResolver } from './_Resolvers/user-detail.resolver';
import { UserListResolver } from './_Resolvers/user-list.resolver';
import { UserEditComponent } from './Patients/UserEdit/UserEdit.component';
import { UserEditResolver } from './_Resolvers/user-edit.resolver';

import { ListPatientsComponent } from './Patients/ListPatients/ListPatients.component';
import { PatientCardComponent } from './Patients/PatientCard/PatientCard.component';
import { PatientDetailComponent } from './Patients/PatientDetail/PatientDetail.component';
import { PatientListResolver } from './_Resolvers/patient-list.resolver';
import { PatientDetailResolver } from './_Resolvers/patient-detail.resolver';
import { PatientEditComponent } from './Patients/PatientEdit/PatientEdit.component';
import { PatientEditResolver } from './_Resolvers/patient-edit.resolver';
import { ReportEditorComponent} from './Patients/Report-Editor/Report-Editor.component';

import { VisitDetailsListComponent } from './Patients/VisitDetailsList/VisitDetailsList.component';
import { VisitDetailsEditComponent } from './Patients/VisitDetailsEdit/VisitDetailsEdit.component';
import { VisitDetailCardComponent } from './Patients/VisitDetailCard/VisitDetailCard.component';
import { VisitListResolver } from './_Resolvers/visit-list.resolver';
import { VisitPreventUnsavedChanges } from './_guards/visit-prevent-unsaved-changes.guard copy';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      TimeAgoPipe,
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
      PatientEditComponent,
      MythsComponent,
      AboutCorouselComponent,
      AboutGuidelinesComponent,
      AboutServicesComponent,
      PatientPortalComponent,
      ReportEditorComponent,
      VisitDetailsListComponent,
      VisitDetailsEditComponent,
      VisitDetailCardComponent,
      SchedulerComponent,
      AppointmentLIstComponent,
      AppointmentDetailComponent,
      MyDateTimePickerComponent,
      PatientLookupComponent,
      FilterPipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      MaterialModule,
      ReactiveFormsModule,
      ReactiveFormsModule,
      LayoutModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      PaginationModule.forRoot(),
      MatCarouselModule.forRoot(),
      RouterModule.forRoot(appRoutes),

      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AuthGuard,
      PreventUnsavedChanges,
      PatientPreventUnsavedChanges,
      VisitPreventUnsavedChanges,
      UserDetailResolver,
      UserListResolver,
      PatientListResolver,
      PatientDetailResolver,
      UserEditResolver,
      PatientEditResolver,
      VisitListResolver,
      AppointmentListResolver,
      AppointmentEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
