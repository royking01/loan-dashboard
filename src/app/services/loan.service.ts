import { Injectable, computed, signal } from '@angular/core';
import { Loan } from '../lib/interfaces/loan';
import { MOCK_LOANS } from '../lib/mock';

@Injectable({ providedIn: 'root' })
export class LoanService {
  selectedLoan = signal<Loan | null>(null);
  allLoans = signal<Loan[]>(MOCK_LOANS);
  searchQuery = signal('');

  filteredLoans = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allLoans();
    return this.allLoans().filter(
      (l) =>
        l.borrower.toLowerCase().includes(query) ||
        l.id.toLowerCase().includes(query) ||
        l.status.toLowerCase().includes(query),
    );
  });

  totalLoans = computed(() => this.filteredLoans().length);

  activeLoans = computed(
    () => this.filteredLoans().filter((l) => l.status === 'Active').length,
  );

  defaultRate = computed(() => {
    const loans = this.filteredLoans();
    if (!loans.length) return 0;
    const defaults = loans.filter((l) => l.status === 'Default').length;
    return (defaults / loans.length) * 100;
  });

  avgLoanSize = computed(() => {
    const loans = this.filteredLoans();
    if (!loans.length) return 0;
    return loans.reduce((sum, l) => sum + l.amount, 0) / loans.length;
  });

  chartDistribution = computed(() => {
    const loans = this.filteredLoans();
    if (!loans.length)
      return { Residential: 0, Commercial: 0, Auto: 0, Personal: 0 };
    const counts = { Residential: 0, Commercial: 0, Auto: 0, Personal: 0 };
    loans.forEach((l) => counts[l.type]++);
    const total = loans.length;
    return {
      Residential: Math.round((counts.Residential / total) * 100),
      Commercial: Math.round((counts.Commercial / total) * 100),
      Auto: Math.round((counts.Auto / total) * 100),
      Personal: Math.round((counts.Personal / total) * 100),
    };
  });

  deleteLoan(id: string): void {
    this.allLoans.update((loans) => loans.filter((l) => l.id !== id));
    this.clearSelectedLoan();
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }
  clearSelectedLoan(): void {
    this.selectedLoan.set(null);
  }
}
