import { describe, it, expect } from 'vitest';
import { ApartmentMapper } from './apartment.mapper';
import { ApartmentDto } from '../models/dtos/apartment.dto';

describe('ApartmentMapper', () => {
  const mockDto: ApartmentDto = {
    id: 'apt-1',
    name: 'Casa Dali',
    tagline: 'Nerja',
    surfaceSqM: 55,
    maxGuests: 4,
    baseGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    airConditioned: true,
    wifiAvailable: true,
    swimmingPools: 3,
    distanceToBeachMeters: 800,
    features: [],
    gallery: [
      { src: '/img1.jpg', alt: 'Salon', category: 'interior' },
      { src: '/img2.jpg', alt: 'Piscine', category: 'village' }
    ]
  };

  it('should map DTO to Entity correctly', () => {
    const entity = ApartmentMapper.toEntity(mockDto);
    expect(entity.id).toBe('apt-1');
    expect(entity.formattedSurface).toBe('55 m²');
    expect(entity.formattedCapacity).toBe('2 à 4 personnes');
    expect(entity.gallery.length).toBe(2);
    expect(entity.getPhotosByCategory('interior').length).toBe(1);
  });
});
