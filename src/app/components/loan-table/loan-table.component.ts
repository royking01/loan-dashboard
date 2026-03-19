import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoanService } from '../../services/loan.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Loan } from '../../lib/interfaces/loan';
import { SortColumn, SortDirection, PAGE_SIZE } from '../../lib/types/types';

@Component({
  selector: 'app-loan-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.scss'],
})
export class LoanTableComponent {
  loanService = inject(LoanService);
  dialog = inject(MatDialog);

  searchInput = '';
  hovered = '';

  sortColumn = signal<SortColumn>('id');
  sortDir = signal<SortDirection>('asc');
  currentPage = signal(1);

  columns = [
    { key: 'id' as SortColumn, label: 'Loan ID', sortable: true },
    { key: 'borrower' as SortColumn, label: 'Borrower', sortable: true },
    { key: 'amount' as SortColumn, label: 'Amount', sortable: true },
    { key: 'rate' as SortColumn, label: 'Rate', sortable: true },
    { key: 'status' as SortColumn, label: 'Status', sortable: false },
    { key: 'date' as SortColumn, label: 'Date', sortable: true },
  ];

  sortedLoans = computed(() => {
    const loans = [...this.loanService.filteredLoans()];
    const col = this.sortColumn();
    const dir = this.sortDir();
    if (!dir) return loans;
    return loans.sort((a, b) => {
      const aVal = a[col];
      const bVal = b[col];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return dir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return dir === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.loanService.filteredLoans().length / PAGE_SIZE)),
  );

  pagedLoans = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * PAGE_SIZE;
    return this.sortedLoans().slice(start, start + PAGE_SIZE);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  sort(col: SortColumn): void {
    if (this.sortColumn() === col) {
      this.sortDir.update((d) =>
        d === 'asc' ? 'desc' : d === 'desc' ? '' : 'asc',
      );
    } else {
      this.sortColumn.set(col);
      this.sortDir.set('asc');
    }
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    const total = this.totalPages();
    this.currentPage.set(Math.max(1, Math.min(page, total)));
  }

  onSearch(query: string): void {
    this.loanService.setSearch(query);
    this.currentPage.set(1);
  }

  clearSearch(): void {
    this.searchInput = '';
    this.loanService.setSearch('');
    this.currentPage.set(1);
  }

  openDeleteDialog(loan: Loan): void {
    // this.loanService.selectedLoan.set(loan);
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: loan,
      width: '400px',
      panelClass: 'confirm-dialog-panel',
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.loanService.deleteLoan(loan.id);
      }
    });
  }
}
