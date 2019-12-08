export interface VisitDetail {
    id: number;
    visitDate: Date;
    complaints: string;
    condition: string;
    prescription: string;
    advise?: string;
    findings?: string;
    remark?: string;
}
