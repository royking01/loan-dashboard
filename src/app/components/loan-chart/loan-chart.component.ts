import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { LoanService } from '../../services/loan.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-loan-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: 'loan-chart.component.html',
  styleUrls: ['loan-chart.component.scss'],
})
export class LoanChartComponent {
  loanService = inject(LoanService);
  themeService = inject(ThemeService);

  COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  LABELS = ['Residential', 'Commercial', 'Auto', 'Personal'];

  chartData = computed<ChartData<'doughnut'>>(() => {
    const dist = this.loanService.chartDistribution();
    const dataValues = [
      dist.Residential,
      dist.Commercial,
      dist.Auto,
      dist.Personal,
    ];

    const allZero = dataValues.every((v) => v === 0);

    return {
      labels: allZero ? ['No Data'] : this.LABELS,
      datasets: [
        {
          data: allZero ? [100] : dataValues,
          backgroundColor: allZero ? ['#cbd5e1'] : this.COLORS,
          borderColor: this.themeService.isDark() ? '#1e293b' : '#ffffff',
          borderWidth: 3,
          hoverBorderWidth: 3,
        },
      ],
    };
  });

  chartOptions = computed<ChartConfiguration<'doughnut'>['options']>(() => ({
    responsive: true,
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { label: any; raw: any }) =>
            ` ${ctx.label}: ${ctx.raw}%`,
        },
      },
    },
  }));

  legendItems = computed(() => {
    const dist = this.loanService.chartDistribution();
    return [
      {
        label: 'Residential',
        percentage: dist.Residential,
        color: this.COLORS[0],
      },
      {
        label: 'Commercial',
        percentage: dist.Commercial,
        color: this.COLORS[1],
      },
      { label: 'Auto', percentage: dist.Auto, color: this.COLORS[2] },
      { label: 'Personal', percentage: dist.Personal, color: this.COLORS[3] },
    ];
  });
}
