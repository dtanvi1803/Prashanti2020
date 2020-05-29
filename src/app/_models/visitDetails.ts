export interface VisitDetail {
    id: number;
    patientId: number;
    visitDate: Date;
    complaints: string;
    condition: string;
    prescription: string;
    advise?: string;
    findings?: string;
    remark?: string;
    status?: string;
    charges?: number;
}
