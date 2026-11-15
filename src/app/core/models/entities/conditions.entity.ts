export interface AvailabilitySlot {
  period: string;
  status: string;
}

export interface PriceCalculationResult {
  weeks: number;
  guests: number;
  basePrice: number;
  extraGuestsCharge: number;
  refundableDeposit: number;
  totalWithoutDeposit: number;
  totalWithDeposit: number;
  depositDueNow: number;
  balanceDueBeforeArrival: number;
}

export class RentalConditions {
  constructor(
    public readonly id: string,
    public readonly baseWeeklyRate: number,
    public readonly currency: string,
    public readonly baseGuests: number,
    public readonly maxGuests: number,
    public readonly extraGuestDailyRate: number,
    public readonly securityDeposit: number,
    public readonly depositPercentage: number,
    public readonly minStayNights: number,
    public readonly contactEmail: string,
    public readonly facebookUrl: string,
    public readonly availabilities: AvailabilitySlot[]
  ) {}

  calculatePrice(weeks: number, guests: number): PriceCalculationResult {
    const safeWeeks = Math.max(1, weeks);
    const safeGuests = Math.min(this.maxGuests, Math.max(1, guests));
    const extraGuests = Math.max(0, safeGuests - this.baseGuests);

    const basePrice = safeWeeks * this.baseWeeklyRate;
    const extraGuestsCharge = extraGuests * this.extraGuestDailyRate * (safeWeeks * 7);
    const totalWithoutDeposit = basePrice + extraGuestsCharge;
    const depositDueNow = Math.round(totalWithoutDeposit * (this.depositPercentage / 100));
    const balanceDueBeforeArrival = totalWithoutDeposit - depositDueNow + this.securityDeposit;

    return {
      weeks: safeWeeks,
      guests: safeGuests,
      basePrice,
      extraGuestsCharge,
      refundableDeposit: this.securityDeposit,
      totalWithoutDeposit,
      totalWithDeposit: totalWithoutDeposit + this.securityDeposit,
      depositDueNow,
      balanceDueBeforeArrival
    };
  }
}
