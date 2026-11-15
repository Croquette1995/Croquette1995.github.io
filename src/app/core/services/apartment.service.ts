import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { APARTMENT_REPOSITORY } from '../repositories/apartment.repository';
import { Apartment, GalleryPhoto } from '../models/entities/apartment.entity';

@Injectable({ providedIn: 'root' })
export class ApartmentService {
  private repo = inject(APARTMENT_REPOSITORY);

  readonly apartmentResource = rxResource<Apartment, unknown>({
    stream: () => this.repo.getApartment()
  });

  readonly apartment = computed<Apartment | undefined>(() => this.apartmentResource.value());
  readonly isLoading = computed<boolean>(() => this.apartmentResource.isLoading());
  readonly error = computed(() => this.apartmentResource.error());

  // Active gallery category filter
  readonly selectedGalleryCategory = signal<'all' | 'interior' | 'outdoor' | 'village' | 'nerja'>('all');

  readonly filteredGallery = computed<GalleryPhoto[]>(() => {
    const apt = this.apartment();
    if (!apt) return [];
    return apt.getPhotosByCategory(this.selectedGalleryCategory());
  });

  setGalleryCategory(cat: 'all' | 'interior' | 'outdoor' | 'village' | 'nerja'): void {
    this.selectedGalleryCategory.set(cat);
  }
}
