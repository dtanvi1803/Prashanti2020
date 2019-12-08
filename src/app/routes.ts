import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { MentalIllnessComponent } from './MentalIllness/MentalIllness.component';
import { ListPatientsComponent } from './ListPatients/ListPatients.component';
import { AuthGuard } from './_guards/auth.guard';
export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'aboutus', component: AboutUsComponent },
    {path: 'contactus', component: ContactUsComponent},
    {path: 'mentalillness', component: MentalIllnessComponent},
    {path: 'listpatients', component: ListPatientsComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '' , pathMatch: 'full'}
];
