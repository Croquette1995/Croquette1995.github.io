export interface ApartmentFeature {
  id: string;
  icon: string;
  titleKey: string;
  items: string[];
  images: string[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'interior' | 'outdoor' | 'village' | 'nerja';
}

export class Apartment {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tagline: string,
    public readonly surfaceSqM: number,
    public readonly maxGuests: number,
    public readonly baseGuests: number,
    public readonly bedrooms: number,
    public readonly bathrooms: number,
    public readonly airConditioned: boolean,
    public readonly wifiAvailable: boolean,
    public readonly swimmingPools: number,
    public readonly distanceToBeachMeters: number,
    public readonly features: ApartmentFeature[],
    public readonly gallery: GalleryPhoto[]
  ) {}

  get formattedCapacity(): string {
    return `${this.baseGuests} à ${this.maxGuests} personnes`;
  }

  get formattedSurface(): string {
    return `${this.surfaceSqM} m²`;
  }

  get formattedBeachDistance(): string {
    return `${this.distanceToBeachMeters} m`;
  }

  getPhotosByCategory(category: 'all' | 'interior' | 'outdoor' | 'village' | 'nerja'): GalleryPhoto[] {
    if (category === 'all') return this.gallery;
    return this.gallery.filter(p => p.category === category);
  }
}
