import { DynamicSectionDto } from '../models/dtos/dynamic-section.dto';
import { DynamicSection } from '../models/entities/dynamic-section.entity';

export class DynamicSectionMapper {
  static toEntity(dto: DynamicSectionDto): DynamicSection {
    return new DynamicSection(
      dto.id,
      dto.type,
      dto.order,
      dto.enabled,
      dto.titleKey,
      dto.subtitleKey,
      dto.customData
    );
  }

  static toDto(entity: DynamicSection): DynamicSectionDto {
    return {
      id: entity.id,
      type: entity.type,
      order: entity.order,
      enabled: entity.enabled,
      titleKey: entity.titleKey,
      subtitleKey: entity.subtitleKey,
      customData: entity.customData
    };
  }
}
