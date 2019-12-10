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
            {path: 'lstpatients/:id', component: ListPatientsComponent, resolve: { patient: PatientDetailResolver}},
        ]
    },
    {path: 'home', component: HomeComponent},
    {path: 'aboutus', component: AboutUsComponent },
    {path: 'contactus', component: ContactUsComponent},
    {path: 'mentalillness', component: MentalIllnessComponent},
    {path: '**', redirectTo: '' , pathMatch: 'full'}
];
