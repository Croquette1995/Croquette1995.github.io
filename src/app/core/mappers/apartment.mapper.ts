import { ApartmentDto } from '../models/dtos/apartment.dto';
import { Apartment, GalleryPhoto } from '../models/entities/apartment.entity';

export class ApartmentMapper {
  static toEntity(dto: ApartmentDto): Apartment {
    const gallery: GalleryPhoto[] = dto.gallery.map((item, index) => ({
      id: `photo-${index}-${item.category}`,
      src: item.src,
      alt: item.alt,
      category: item.category
    }));

    return new Apartment(
      dto.id,
      dto.name,
      dto.tagline,
      dto.surfaceSqM,
      dto.maxGuests,
      dto.baseGuests,
      dto.bedrooms,
      dto.bathrooms,
      dto.airConditioned,
      dto.wifiAvailable,
      dto.swimmingPools,
      dto.distanceToBeachMeters,
      dto.features,
      gallery
    );
  }

  static toDto(entity: Apartment): ApartmentDto {
    return {
      id: entity.id,
      name: entity.name,
      tagline: entity.tagline,
      surfaceSqM: entity.surfaceSqM,
      maxGuests: entity.maxGuests,
      baseGuests: entity.baseGuests,
      bedrooms: entity.bedrooms,
      bathrooms: entity.bathrooms,
      airConditioned: entity.airConditioned,
      wifiAvailable: entity.wifiAvailable,
      swimmingPools: entity.swimmingPools,
      distanceToBeachMeters: entity.distanceToBeachMeters,
      features: entity.features,
      gallery: entity.gallery.map(p => ({
        src: p.src,
        alt: p.alt,
        category: p.category
      }))
    };
  }
}
