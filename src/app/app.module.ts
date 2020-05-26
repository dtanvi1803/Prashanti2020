import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import {TimeAgoPipe} from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.Interceptor';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { MatInputModule, MatButtonModule, MatSelectModule, 
   MatRadioModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatExpansionModule, MatTabsModule,
   MatIconModule, MatListModule, MatGridListModule, MatMenuModule, MatDatepickerModule, MatDialogModule, MatChipsModule,
    MatStepperModule, MatNativeDateModule } from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

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
import { MythsComponent } from './myths/myths.component';
import { AboutCorouselComponent } from './aboutUs/About-corousel/About-corousel.component';
import { AboutGuidelinesComponent } from './aboutUs/about-guidelines/about-guidelines.component';
import { AboutServicesComponent } from './aboutUs/about-Services/about-Services.component';
import { PatientPortalComponent } from './PatientPortal/PatientPortal.component';
import { ReportEditorComponent} from './Patients/Report-Editor/Report-Editor.component';
import { VisitDetailsListComponent } from './Patients/VisitDetailsList/VisitDetailsList.component';
import { VisitDetailsEditComponent } from './Patients/VisitDetailsEdit/VisitDetailsEdit.component';
import { VisitDetailCardComponent } from './Patients/VisitDetailCard/VisitDetailCard.component';
import { VisitListResolver } from './_Resolvers/visit-list.resolver';
import { VisitPreventUnsavedChanges } from './_guards/visit-prevent-unsaved-changes.guard copy';
import { SchedulerComponent } from './Patients/Scheduler/Scheduler.component';
import { AppointmentLIstComponent } from './Patients/Scheduler/AppointmentLIst/AppointmentLIst.component';
import { AppointmentDetailComponent } from './Patients/Scheduler/AppointmentDetail/AppointmentDetail.component';
import { AppointmentListResolver } from './_Resolvers/appointment-list.resolver';
import { AppointmentEditResolver } from './_Resolvers/appointment-edit.resolver';
import { MyDateTimePickerComponent } from './MyDateTimePicker/MyDateTimePicker.component';
import { FilterPipe } from './Patients/filter.pipe';
import { PatientLookupComponent } from './Patients/patient-lookup/patient-lookup.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



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
      ReactiveFormsModule,
      BrowserAnimationsModule,
      PaginationModule.forRoot(),
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatRadioModule,
      MatCardModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      LayoutModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatGridListModule,
      MatMenuModule,
      MatDialogModule,
      MatExpansionModule,
      MatChipsModule,
      MatStepperModule,
      MatTabsModule,
      NgxMaterialTimepickerModule,
      MatCarouselModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
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
