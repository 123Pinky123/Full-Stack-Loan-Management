export interface RepaymentModel {
  id?: number;
  applicationId: number;
  amountPaid: number;
  paymentDate: string; // ISO date format "2025-09-22"
}
