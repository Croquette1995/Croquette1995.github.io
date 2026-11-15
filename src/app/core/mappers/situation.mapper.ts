import { SituationDto } from '../models/dtos/situation.dto';
import { LocationGuide } from '../models/entities/location.entity';

export class SituationMapper {
  static toEntity(dto: SituationDto): LocationGuide {
    return new LocationGuide(
      dto.id,
      dto.capistrano,
      dto.nerja,
      dto.mustSee
    );
  }

  static toDto(entity: LocationGuide): SituationDto {
    return {
      id: entity.id,
      capistrano: entity.capistrano,
      nerja: entity.nerja,
      mustSee: entity.mustSee
    };
  }
}
