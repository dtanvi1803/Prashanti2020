export interface User {
    id: number;
    username: string;
    clinicID: number;
    isAdmin: boolean;
    gender: string;
    dateOfBirth: Date;
    lastActive: Date;
    city: string;
    country: string;
    email?: string;
    contactno?: string;
    introduction?: string;
    lookingFor?: string;
    intrests?: string;

}
