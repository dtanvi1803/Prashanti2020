export interface Report {
    id: number;
    url: string;
    reportAdded: Date;
    read: boolean;
    description?: string;
    details?: string;
    remark?: string;
}
