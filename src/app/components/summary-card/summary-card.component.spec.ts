import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryCardComponent } from './summary-card.component';
import { By } from '@angular/platform-browser';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('cardItem', {
      label: 'Total Loans',
      value: 1000,
      trend: 5.2,
      icon: '',
      prefix: '',
      suffix: '',
      decimals: 0,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the correct label and value', () => {
    fixture.componentRef.setInput('cardItem', {
      label: 'Total Loans',
      value: 1200,
      trend: 0,
    });
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('.label')).nativeElement;
    const valueEl = fixture.debugElement.query(By.css('.value')).nativeElement;

    expect(labelEl.textContent).toContain('Total Loans');
    expect(valueEl.textContent.replace(/\s/g, '')).toBe('1,200');
  });

  it('applies correct CSS class for positive trend', () => {
    fixture.componentRef.setInput('cardItem', {
      label: 'Trend',
      value: 0,
      trend: 5,
    });
    fixture.detectChanges();

    const trendEl = fixture.debugElement.query(By.css('.trend')).nativeElement;

    expect(trendEl.classList).toContain('trend-positive');
    expect(trendEl.textContent).toContain('+5.0%');
  });

  it('applies correct CSS class for negative trend', () => {
    fixture.componentRef.setInput('cardItem', {
      label: 'Trend',
      value: 0,
      trend: -3.2,
    });
    fixture.detectChanges();

    const trendEl = fixture.debugElement.query(By.css('.trend')).nativeElement;

    expect(trendEl.classList).toContain('trend-negative');
    expect(trendEl.textContent).toContain('-3.2%');
  });

  it('renders icon when provided', () => {
    fixture.componentRef.setInput('cardItem', {
      label: 'Icon Test',
      value: 0,
      trend: 0,
      icon: 'check_circle',
    });
    fixture.detectChanges();

    const iconEl = fixture.debugElement.query(By.css('.icon'));
    expect(iconEl).toBeTruthy();
    expect(iconEl.nativeElement.textContent).toContain('check_circle');
  });

  it('hides icon when not provided', () => {
    fixture.componentRef.setInput('cardItem', {
      label: 'No Icon',
      value: 0,
      trend: 0,
      icon: '',
    });
    fixture.detectChanges();

    const iconEl = fixture.debugElement.query(By.css('.icon'));
    expect(iconEl).toBeNull();
  });
});
