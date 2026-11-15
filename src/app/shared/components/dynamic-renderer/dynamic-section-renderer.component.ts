import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { 
  SectionViewModel, 
  SectionType,
  HeroSectionViewModel,
  ApartmentTourSectionViewModel,
  GallerySectionViewModel,
  SituationSectionViewModel,
  PricingSectionViewModel,
  UsefulLinksSectionViewModel,
  ContactSectionViewModel
} from '../../view-models/section.view-model';

import { HeroComponent } from '../../../features/hero/hero.component';
import { ApartmentTourComponent } from '../../../features/apartment-tour/apartment-tour.component';
import { GalleryComponent } from '../../../features/gallery/gallery.component';
import { SituationGuideComponent } from '../../../features/situation-guide/situation-guide.component';
import { PricingBookingComponent } from '../../../features/pricing-booking/pricing-booking.component';
import { UsefulLinksComponent } from '../../../features/useful-links/useful-links.component';
import { ContactSectionComponent } from '../../../features/contact-modal/contact-modal.component';

/**
 * Dynamic Section Rendering Engine.
 * Employs typed ViewModels with Angular 22 ng-template / ngTemplateOutlet injection,
 * perfectly anticipating dynamic blocks managed via a PocketBase CMS backend.
 */
@Component({
  selector: 'app-dynamic-section-renderer',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    HeroComponent,
    ApartmentTourComponent,
    GalleryComponent,
    SituationGuideComponent,
    PricingBookingComponent,
    UsefulLinksComponent,
    ContactSectionComponent
  ],
  template: `
    <!-- Render each dynamic section based on its view model through ng-template -->
    @for (section of sections(); track section.id) {
      <ng-container 
        [ngTemplateOutlet]="resolveTemplate(section.type)" 
        [ngTemplateOutletContext]="{ $implicit: section }"
      />
    }

    <!-- Template for Hero Block -->
    <ng-template #heroTpl let-vm>
      <app-hero [vm]="asHeroVm(vm)" />
    </ng-template>

    <!-- Template for Apartment Tour Block -->
    <ng-template #apartmentTpl let-vm>
      <app-apartment-tour [vm]="asAptVm(vm)" />
    </ng-template>

    <!-- Template for Photo Gallery Block -->
    <ng-template #galleryTpl let-vm>
      <app-gallery [vm]="asGalleryVm(vm)" />
    </ng-template>

    <!-- Template for Situation & Guide Block -->
    <ng-template #situationTpl let-vm>
      <app-situation-guide [vm]="asSituationVm(vm)" />
    </ng-template>

    <!-- Template for Pricing & Simulator Block -->
    <ng-template #pricingTpl let-vm>
      <app-pricing-booking [vm]="asPricingVm(vm)" />
    </ng-template>

    <!-- Template for Useful Links Block -->
    <ng-template #linksTpl let-vm>
      <app-useful-links [vm]="asLinksVm(vm)" />
    </ng-template>

    <!-- Template for Contact Block -->
    <ng-template #contactTpl let-vm>
      <app-contact-section [vm]="asContactVm(vm)" />
    </ng-template>
  `
})
export class DynamicSectionRendererComponent {
  readonly sections = input.required<SectionViewModel[]>();

  // Template references resolved via Angular 22 viewChild signal queries
  readonly heroTpl = viewChild.required<TemplateRef<unknown>>('heroTpl');
  readonly apartmentTpl = viewChild.required<TemplateRef<unknown>>('apartmentTpl');
  readonly galleryTpl = viewChild.required<TemplateRef<unknown>>('galleryTpl');
  readonly situationTpl = viewChild.required<TemplateRef<unknown>>('situationTpl');
  readonly pricingTpl = viewChild.required<TemplateRef<unknown>>('pricingTpl');
  readonly linksTpl = viewChild.required<TemplateRef<unknown>>('linksTpl');
  readonly contactTpl = viewChild.required<TemplateRef<unknown>>('contactTpl');

  resolveTemplate(type: SectionType): TemplateRef<unknown> {
    switch (type) {
      case 'hero': return this.heroTpl();
      case 'apartment-tour': return this.apartmentTpl();
      case 'gallery': return this.galleryTpl();
      case 'situation-guide': return this.situationTpl();
      case 'pricing-booking': return this.pricingTpl();
      case 'useful-links': return this.linksTpl();
      case 'contact': return this.contactTpl();
    }
  }

  // Type helper casts for strict template typing
  asHeroVm(vm: unknown): HeroSectionViewModel {
    return vm as HeroSectionViewModel;
  }

  asAptVm(vm: unknown): ApartmentTourSectionViewModel {
    return vm as ApartmentTourSectionViewModel;
  }

  asGalleryVm(vm: unknown): GallerySectionViewModel {
    return vm as GallerySectionViewModel;
  }

  asSituationVm(vm: unknown): SituationSectionViewModel {
    return vm as SituationSectionViewModel;
  }

  asPricingVm(vm: unknown): PricingSectionViewModel {
    return vm as PricingSectionViewModel;
  }

  asLinksVm(vm: unknown): UsefulLinksSectionViewModel {
    return vm as UsefulLinksSectionViewModel;
  }

  asContactVm(vm: unknown): ContactSectionViewModel {
    return vm as ContactSectionViewModel;
  }
}
