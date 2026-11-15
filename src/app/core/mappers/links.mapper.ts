import { LinksDto, UsefulLinkDto } from '../models/dtos/links.dto';
import { LinksDirectory, UsefulLink } from '../models/entities/links.entity';

export class LinksMapper {
  private static getIconForCategory(cat: string): string {
    switch (cat) {
      case 'flights': return 'plane';
      case 'carRental': return 'car';
      case 'transports': return 'bus';
      case 'tourism': return 'compass';
      default: return 'external-link';
    }
  }

  static toEntity(dto: LinksDto): LinksDirectory {
    const mappedLinks: UsefulLink[] = dto.usefulLinks.map(l => ({
      id: l.id,
      name: l.name,
      category: l.category,
      url: l.url,
      note: l.note,
      iconName: this.getIconForCategory(l.category)
    }));

    return new LinksDirectory(
      dto.id,
      mappedLinks,
      dto.restaurantGuide
    );
  }

  static toDto(entity: LinksDirectory): LinksDto {
    return {
      id: entity.id,
      usefulLinks: entity.links.map(l => ({
        id: l.id,
        name: l.name,
        category: l.category,
        url: l.url,
        note: l.note
      })),
      restaurantGuide: entity.restaurantGuide
    };
  }
}
