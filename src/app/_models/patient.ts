import { VisitDetail } from './visitDetails';
import { User } from './user';
import { Report } from './report';

export interface Patient {
    id: number;
    name: string;
    gender: string;
    dateOfBirth: Date;
    clinicId: number;
    lastVisit: Date;
    referingDr: string;
    age: number;
    city: string,
    country: string,
    snapshot?: string;
    email?: string;
    contactNo?: string;
    registeredDate: Date;
    diagnosis?: string;
    shortHistory?: string;
    drugAllergy?:string;
    ongoingMedication?: string;
    recentInvestigation?: string;
    remark?: string;
    photoUrl:string;
    visitDetails?: VisitDetail[];
    reports?: Report[];
}
