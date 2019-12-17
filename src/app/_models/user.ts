export interface User {
    id: number;
    username: string;
    clinicID: number;
    isAdmin: boolean;
    gender: string;
    dateOfBirth: Date;
    age: number;
    lastActive: Date;
    city: string;
    country: string;
    email?: string;
    contactno?: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;

}
