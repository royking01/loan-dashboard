import { Loan } from '../interfaces/loan';

export type SortColumn = keyof Loan;
export type SortDirection = 'asc' | 'desc' | '';

export const PAGE_SIZE = 10;
