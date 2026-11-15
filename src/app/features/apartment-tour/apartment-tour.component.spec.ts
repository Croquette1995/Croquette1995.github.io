import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApartmentTourComponent } from './apartment-tour.component';
import { ApartmentTourSectionViewModel } from '../../shared/view-models/section.view-model';

describe('ApartmentTourComponent', () => {
  const mockVm: ApartmentTourSectionViewModel = {
    id: 'apartment-tour',
    type: 'apartment-tour',
    apartment: signal(undefined),
    isLoading: signal(false)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentTourComponent],
      providers: [
        {
          provide: TranslocoService,
          useValue: {
            translate: vi.fn((k: string) => k),
            getActiveLang: vi.fn().mockReturnValue('fr')
          }
        }
      ]
    }).compileComponents();
  });

  it('resets currentImageIndex to 0 when switching tabs', () => {
    const fixture = TestBed.createComponent(ApartmentTourComponent);
    fixture.componentRef.setInput('vm', mockVm);
    const component = fixture.componentInstance;

    component.nextImage(4);
    expect(component.currentImageIndex()).toBe(1);

    component.selectTab('outdoor');
    expect(component.activeTabId()).toBe('outdoor');
    expect(component.currentImageIndex()).toBe(0);
  });

  it('wraps around cleanly on prevImage and nextImage', () => {
    const fixture = TestBed.createComponent(ApartmentTourComponent);
    fixture.componentRef.setInput('vm', mockVm);
    const component = fixture.componentInstance;

    component.prevImage(3);
    expect(component.currentImageIndex()).toBe(2);

    component.nextImage(3);
    expect(component.currentImageIndex()).toBe(0);

    // Single image should be a no-op
    component.nextImage(1);
    expect(component.currentImageIndex()).toBe(0);
  });
});
