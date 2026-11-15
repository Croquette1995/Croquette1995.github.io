import { ConditionsDto } from '../models/dtos/conditions.dto';
import { RentalConditions } from '../models/entities/conditions.entity';

export class ConditionsMapper {
  static toEntity(dto: ConditionsDto): RentalConditions {
    return new RentalConditions(
      dto.id,
      dto.baseWeeklyRate,
      dto.currency,
      dto.baseGuests,
      dto.maxGuests,
      dto.extraGuestDailyRate,
      dto.securityDeposit,
      dto.depositPercentage,
      dto.minStayNights,
      dto.contactEmail,
      dto.facebookUrl,
      dto.availabilities
    );
  }

  static toDto(entity: RentalConditions): ConditionsDto {
    return {
      id: entity.id,
      baseWeeklyRate: entity.baseWeeklyRate,
      currency: entity.currency,
      baseGuests: entity.baseGuests,
      maxGuests: entity.maxGuests,
      extraGuestDailyRate: entity.extraGuestDailyRate,
      securityDeposit: entity.securityDeposit,
      depositPercentage: entity.depositPercentage,
      minStayNights: entity.minStayNights,
      contactEmail: entity.contactEmail,
      facebookUrl: entity.facebookUrl,
      availabilities: entity.availabilities
    };
  }
}
