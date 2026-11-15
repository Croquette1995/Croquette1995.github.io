export interface AvailabilityDto {
  period: string;
  status: string;
}

export interface ConditionsDto {
  id: string;
  baseWeeklyRate: number;
  currency: string;
  baseGuests: number;
  maxGuests: number;
  extraGuestDailyRate: number;
  securityDeposit: number;
  depositPercentage: number;
  minStayNights: number;
  contactEmail: string;
  facebookUrl: string;
  availabilities: AvailabilityDto[];
}
