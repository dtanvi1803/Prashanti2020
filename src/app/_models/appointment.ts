export interface Appointment {
    id: number;
    appDate: Date;
    start: Date;
    end: Date;
    clinicId: number;
    status: string;
    title: string;
    complaints: string;
    userId: number;
    patientId: number;

}