export interface ApplicationModel {

  id?: number;
  userId: number;
  loanId: number;
  status: string; // "PENDING", "APPROVED", "REJECTED"
}
