import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from '../../components/summary-card/summary-card.component';
import { LoanTableComponent } from '../../components/loan-table/loan-table.component';
import { LoanChartComponent } from '../../components/loan-chart/loan-chart.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SummaryCardComponent,
    LoanTableComponent,
    LoanChartComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  loanService = inject(LoanService);
  summaryCards = [
    {
      label: 'Total Loans',
      value: this.loanService.totalLoans(),
      trend: 3.2,
      icon: 'credit_card',
    },
    {
      label: 'Active Loans',
      value: this.loanService.activeLoans(),
      trend: 1.8,
      icon: 'schedule',
    },
    {
      label: 'Default Rate',
      value: this.loanService.defaultRate(),
      trend: -0.5,
      suffix: '%',
      decimals: 1,
      icon: 'warning',
    },
    {
      label: 'Avg. Loan Size',
      value: this.loanService.avgLoanSize(),
      trend: 4.1,
      prefix: '$',
      icon: 'fitness_center',
    },
  ];
}
