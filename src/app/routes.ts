import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { MentalIllnessComponent } from './MentalIllness/MentalIllness.component';
import { ListPatientsComponent } from './Patients/ListPatients/ListPatients.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserListComponent } from './Patients/UserList/UserList.component';
import { UserDetailComponent } from './Patients/userDetail/userDetail.component';
import { UserDetailResolver } from './_Resolvers/user-detail.resolver';
import { UserListResolver } from './_Resolvers/user-list.resolver';
import { PatientDetailResolver } from './_Resolvers/patient-detail.resolver';
import { PatientListResolver } from './_Resolvers/patient-list.resolver';
import { UserEditComponent } from './Patients/UserEdit/UserEdit.component';
import { UserEditResolver } from './_Resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PatientPreventUnsavedChanges } from './_guards/patient-prevent-unsaved-changes.guard';
import { PatientEditComponent } from './Patients/PatientEdit/PatientEdit.component';
import { PatientDetailComponent } from './Patients/PatientDetail/PatientDetail.component';
import { PatientEditResolver } from './_Resolvers/patient-edit.resolver';
import { MythsComponent } from './myths/myths.component';
import { AboutGuidelinesComponent } from './aboutUs/about-guidelines/about-guidelines.component';
import { AboutServicesComponent } from './aboutUs/about-Services/about-Services.component';
import { PatientPortalComponent } from './PatientPortal/PatientPortal.component';
import { VisitDetailsListComponent } from './Patients/VisitDetailsList/VisitDetailsList.component';
import { VisitDetailCardComponent } from './Patients/VisitDetailCard/VisitDetailCard.component';
import { VisitDetailsEditComponent } from './Patients/VisitDetailsEdit/VisitDetailsEdit.component';
import { VisitListResolver } from './_Resolvers/visit-list.resolver';
import { VisitPreventUnsavedChanges } from './_guards/visit-prevent-unsaved-changes.guard copy';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'listusers', component: UserListComponent, resolve: { users: UserListResolver}},
            {path: 'listusers/edit', component: UserEditComponent,
                resolve: { user: UserEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'listusers/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver}},
            {path: 'lstpatients', component: ListPatientsComponent, resolve: { patients: PatientListResolver}},
            {path: 'lstpatients/edit/:id', component: PatientEditComponent,
             resolve: { patients: PatientEditResolver}, canDeactivate: [PatientPreventUnsavedChanges]},
             {
                path: 'lstpatients/visits/:id',
                component: VisitDetailsEditComponent,
                resolve: {visit: VisitListResolver}, canDeactivate: [VisitPreventUnsavedChanges]
              },
            {path: 'lstpatients/:id', component: PatientDetailComponent, resolve: { patient: PatientDetailResolver}},
            // {    
            //     path: 'lstpatients/visits',
            //     component: VisitDetailsListComponent,
            //     resolve: { users: VisitListResolver }
            //   },

        ]
    },
    {path: 'home', component: HomeComponent},
    {path: 'aboutus', component: AboutUsComponent },
    {path: 'contactus', component: ContactUsComponent},
    {path: 'mentalillness', component: MentalIllnessComponent},
    {path: 'guidelines', component: AboutGuidelinesComponent},
    {path: 'services', component: AboutServicesComponent},
    {path: 'myths', component: MythsComponent},
    {path: 'portal', component: PatientPortalComponent},
    {path: '**', redirectTo: '' , pathMatch: 'full'}
];
