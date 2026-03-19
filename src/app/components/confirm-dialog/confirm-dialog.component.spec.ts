import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { LoanService } from '../../services/loan.service';
import { signal } from '@angular/core';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockLoanService: Partial<LoanService>;

  const mockLoan = { id: 'loan-123', amount: 1000 } as any;

  beforeEach(async () => {
    mockLoanService = {
      clearSelectedLoan: jest.fn(),
      deleteLoan: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [{ provide: LoanService, useValue: mockLoanService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedLoan', mockLoan);
    fixture.detectChanges();
  });

  it('renders the selected loan ID in the template', () => {
    const loanText = fixture.debugElement.query(By.css('p b')).nativeElement
      .textContent;
    expect(loanText).toBe('loan-123');
  });

  it('calls clearSelectedLoan when Cancel button is clicked', () => {
    const cancelBtn = fixture.debugElement.query(
      By.css('button[aria-label="Cancel delete"]'),
    );
    cancelBtn.triggerEventHandler('click', null);
    expect(mockLoanService.clearSelectedLoan).toHaveBeenCalled();
  });

  it('calls deleteLoan with the correct ID when Delete button is clicked', () => {
    const deleteBtn = fixture.debugElement.query(
      By.css('button[aria-label="Confirm delete"]'),
    );
    deleteBtn.triggerEventHandler('click', null);
    expect(mockLoanService.deleteLoan).toHaveBeenCalledWith('loan-123');
  });
});
