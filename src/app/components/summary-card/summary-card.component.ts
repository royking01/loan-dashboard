import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
  imports: [CommonModule],
})
export class SummaryCardComponent {
  cardItem = input.required<{
    label: string;
    value: number;
    trend: number;
    icon?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }>();

  formattedTrend(): string {
    const t = this.cardItem()?.trend as number;
    const sign = t >= 0 ? '+' : '';
    return `${sign}${t.toFixed(1)}%`;
  }
}
