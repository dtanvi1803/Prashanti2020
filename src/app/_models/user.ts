export interface User {
    id: number;
    username: string;
    name: string;
    clinicID: number;
    isAdmin: boolean;
    gender: string;
    dateOfBirth: Date;
    age: number;
    lastActive: any;
    city: string;
    country: string;
    created: Date;
    email?: string;
    contactno?: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    education?: string;
    photoUrl?: string;

}
