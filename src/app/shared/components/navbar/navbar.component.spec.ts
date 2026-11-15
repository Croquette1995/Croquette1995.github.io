import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { TranslocoService } from '@jsverse/transloco';

describe('NavbarComponent', () => {
  let mockTransloco: {
    getActiveLang: ReturnType<typeof vi.fn>;
    setActiveLang: ReturnType<typeof vi.fn>;
    translate: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockTransloco = {
      getActiveLang: vi.fn().mockReturnValue('fr'),
      setActiveLang: vi.fn(),
      translate: vi.fn((key: string) => key),
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: TranslocoService, useValue: mockTransloco }
      ]
    }).compileComponents();
  });

  it('should create and have correct initial state', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.currentLang()).toBe('fr');
    expect(component.currentItem().badge).toBe('FR');
    expect(component.langDropdownOpen()).toBe(false);
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('should toggle and close language dropdown', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    component.toggleLangDropdown();
    expect(component.langDropdownOpen()).toBe(true);

    component.closeLangDropdown();
    expect(component.langDropdownOpen()).toBe(false);
  });

  it('should select language and update state', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    component.selectLang('es');
    expect(mockTransloco.setActiveLang).toHaveBeenCalledWith('es');
    expect(component.currentLang()).toBe('es');
    expect(component.currentItem().badge).toBe('ES');
    expect(component.langDropdownOpen()).toBe(false);
  });

  it('should toggle and close mobile menu', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    component.toggleMobileMenu();
    expect(component.mobileMenuOpen()).toBe(true);

    component.closeMobileMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });
});
