import { VisitDetail } from './visitDetails';
import { User } from './user';

export interface Patient {
    id: number;
    name: string;
    gender: string;
    dateOfBirth: Date;
    clinicId: number;
    lastVisit: Date;
    ReferingDr: User;
    city: string,
    Country: string,
    snapshot: string;
    email: string;
    contactNo: string;
    registeredDate: Date;
    diagnosis: string;
    remark: string;
    visitDetails: VisitDetail[];
}
