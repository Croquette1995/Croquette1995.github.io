import { inject, Injectable, signal } from '@angular/core';
import { ApartmentService } from './apartment.service';
import { BookingSimulatorService } from './booking-simulator.service';
import { SituationService } from './situation.service';
import { LinksService } from './links.service';
import { GalleryPhoto } from '../models/entities/apartment.entity';
import { 
  SectionViewModel, 
  HeroSectionViewModel, 
  ApartmentTourSectionViewModel, 
  GallerySectionViewModel, 
  PricingSectionViewModel, 
  SituationSectionViewModel, 
  UsefulLinksSectionViewModel, 
  ContactSectionViewModel 
} from '../../shared/view-models/section.view-model';

@Injectable({ providedIn: 'root' })
export class DynamicSectionService {
  private aptService = inject(ApartmentService);
  private bookingService = inject(BookingSimulatorService);
  private situationService = inject(SituationService);
  private linksService = inject(LinksService);

  // Active photo for the lightbox overlay
  readonly activeLightboxPhoto = signal<GalleryPhoto | null>(null);

  openLightbox(photo: GalleryPhoto): void {
    this.activeLightboxPhoto.set(photo);
  }

  closeLightbox(): void {
    this.activeLightboxPhoto.set(null);
  }

  /**
   * Constructs the reactive View Models for each section block.
   * This structure is directly compatible with a dynamic CMS/PocketBase collection
   * that defines the order, settings, and components of a page.
   */
  getHomePageSections(): SectionViewModel[] {
    const heroVm: HeroSectionViewModel = {
      id: 'section-hero',
      type: 'hero',
      apartment: this.aptService.apartment,
      isLoading: this.aptService.isLoading
    };

    const aptVm: ApartmentTourSectionViewModel = {
      id: 'section-apartment',
      type: 'apartment-tour',
      apartment: this.aptService.apartment,
      isLoading: this.aptService.isLoading
    };

    const galleryVm: GallerySectionViewModel = {
      id: 'section-gallery',
      type: 'gallery',
      photos: this.aptService.filteredGallery,
      activeCategory: this.aptService.selectedGalleryCategory,
      onSelectCategory: (cat) => this.aptService.setGalleryCategory(cat),
      onOpenLightbox: (photo) => this.openLightbox(photo)
    };

    const situationVm: SituationSectionViewModel = {
      id: 'section-situation',
      type: 'situation-guide',
      situation: this.situationService.situation,
      mustSeeSpots: this.situationService.mustSeeSpots,
      isLoading: this.situationService.isLoading
    };

    const pricingVm: PricingSectionViewModel = {
      id: 'section-pricing',
      type: 'pricing-booking',
      conditions: this.bookingService.conditions,
      calculation: this.bookingService.calculation,
      weeks: this.bookingService.weeks,
      guests: this.bookingService.guests,
      setWeeks: (w) => this.bookingService.setWeeks(w),
      setGuests: (g) => this.bookingService.setGuests(g)
    };

    const linksVm: UsefulLinksSectionViewModel = {
      id: 'section-links',
      type: 'useful-links',
      directory: this.linksService.linksDirectory,
      isLoading: this.linksService.isLoading
    };

    const contactVm: ContactSectionViewModel = {
      id: 'section-contact',
      type: 'contact',
      conditions: this.bookingService.conditions
    };

    return [
      heroVm,
      aptVm,
      galleryVm,
      situationVm,
      pricingVm,
      linksVm,
      contactVm
    ];
  }
}
