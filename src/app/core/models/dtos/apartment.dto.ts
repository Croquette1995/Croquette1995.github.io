export interface ApartmentFeatureDto {
  id: string;
  icon: string;
  titleKey: string;
  items: string[];
  images: string[];
}

export interface GalleryItemDto {
  src: string;
  alt: string;
  category: 'interior' | 'outdoor' | 'village' | 'nerja';
}

export interface ApartmentDto {
  id: string;
  name: string;
  tagline: string;
  surfaceSqM: number;
  maxGuests: number;
  baseGuests: number;
  bedrooms: number;
  bathrooms: number;
  airConditioned: boolean;
  wifiAvailable: boolean;
  swimmingPools: number;
  distanceToBeachMeters: number;
  features: ApartmentFeatureDto[];
  gallery: GalleryItemDto[];
}
