import { Signal } from '@angular/core';
import { Apartment, GalleryPhoto } from '../../core/models/entities/apartment.entity';
import { RentalConditions, PriceCalculationResult } from '../../core/models/entities/conditions.entity';
import { LocationGuide, MustSeeSpot } from '../../core/models/entities/location.entity';
import { LinksDirectory } from '../../core/models/entities/links.entity';

export type SectionType = 
  | 'hero' 
  | 'apartment-tour' 
  | 'gallery' 
  | 'pricing-booking' 
  | 'situation-guide' 
  | 'useful-links' 
  | 'contact';

export interface BaseSectionViewModel {
  readonly id: string;
  readonly type: SectionType;
  readonly titleKey?: string;
  readonly subtitleKey?: string;
}

export interface HeroSectionViewModel extends BaseSectionViewModel {
  readonly type: 'hero';
  readonly apartment: Signal<Apartment | undefined>;
  readonly isLoading: Signal<boolean>;
}

export interface ApartmentTourSectionViewModel extends BaseSectionViewModel {
  readonly type: 'apartment-tour';
  readonly apartment: Signal<Apartment | undefined>;
  readonly isLoading: Signal<boolean>;
}

export interface GallerySectionViewModel extends BaseSectionViewModel {
  readonly type: 'gallery';
  readonly photos: Signal<GalleryPhoto[]>;
  readonly activeCategory: Signal<string>;
  readonly onSelectCategory: (cat: 'all' | 'interior' | 'outdoor' | 'village' | 'nerja') => void;
  readonly onOpenLightbox: (photo: GalleryPhoto) => void;
}

export interface PricingSectionViewModel extends BaseSectionViewModel {
  readonly type: 'pricing-booking';
  readonly conditions: Signal<RentalConditions | undefined>;
  readonly calculation: Signal<PriceCalculationResult | null>;
  readonly weeks: Signal<number>;
  readonly guests: Signal<number>;
  readonly setWeeks: (w: number) => void;
  readonly setGuests: (g: number) => void;
}

export interface SituationSectionViewModel extends BaseSectionViewModel {
  readonly type: 'situation-guide';
  readonly situation: Signal<LocationGuide | undefined>;
  readonly mustSeeSpots: Signal<MustSeeSpot[]>;
  readonly isLoading: Signal<boolean>;
}

export interface UsefulLinksSectionViewModel extends BaseSectionViewModel {
  readonly type: 'useful-links';
  readonly directory: Signal<LinksDirectory | undefined>;
  readonly isLoading: Signal<boolean>;
}

export interface ContactSectionViewModel extends BaseSectionViewModel {
  readonly type: 'contact';
  readonly conditions: Signal<RentalConditions | undefined>;
}

export type SectionViewModel = 
  | HeroSectionViewModel
  | ApartmentTourSectionViewModel
  | GallerySectionViewModel
  | PricingSectionViewModel
  | SituationSectionViewModel
  | UsefulLinksSectionViewModel
  | ContactSectionViewModel;
