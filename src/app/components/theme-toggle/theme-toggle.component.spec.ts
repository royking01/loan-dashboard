import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let mockThemeService: Partial<ThemeService>;

  beforeEach(async () => {
    const isDarkSignal = signal(false);
    mockThemeService = {
      isDark: isDarkSignal,
      toggle: jest.fn(() => {
        isDarkSignal.set(!isDarkSignal());
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent, MatSlideToggleModule, FormsModule],
      providers: [{ provide: ThemeService, useValue: mockThemeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initially renders slide toggle unchecked', () => {
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect(toggle.componentInstance.checked).toBe(false);
  });

  it('calls themeService.toggle on slide toggle change', () => {
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    toggle.triggerEventHandler('change', { checked: true });
    expect(mockThemeService.toggle).toHaveBeenCalled();
  });

  it('updates isDark signal after toggle', () => {
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect((mockThemeService as ThemeService).isDark()).toBe(false);
    toggle.triggerEventHandler('change', { checked: true });
    expect((mockThemeService as ThemeService).isDark()).toBe(true);
  });
});
