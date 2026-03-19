export type LoanStatus = 'Active' | 'Review' | 'Default' | 'Closed';
export type LoanType = 'Residential' | 'Commercial' | 'Auto' | 'Personal';

export interface Loan {
  id: string;
  borrower: string;
  amount: number;
  rate: number;
  status: LoanStatus;
  date: string;
  type: LoanType;
}
