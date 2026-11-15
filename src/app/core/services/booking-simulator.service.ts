import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CONDITIONS_REPOSITORY } from '../repositories/conditions.repository';
import { RentalConditions, PriceCalculationResult } from '../models/entities/conditions.entity';

@Injectable({ providedIn: 'root' })
export class BookingSimulatorService {
  private repo = inject(CONDITIONS_REPOSITORY);

  readonly conditionsResource = rxResource<RentalConditions, unknown>({
    stream: () => this.repo.getConditions()
  });

  readonly conditions = computed<RentalConditions | undefined>(() => this.conditionsResource.value());
  readonly isLoading = computed<boolean>(() => this.conditionsResource.isLoading());

  // Interactive signals for the simulator
  readonly weeks = signal<number>(1);
  readonly guests = signal<number>(2);

  readonly calculation = computed<PriceCalculationResult | null>(() => {
    const cond = this.conditions();
    if (!cond) return null;
    return cond.calculatePrice(this.weeks(), this.guests());
  });

  setWeeks(w: number): void {
    this.weeks.set(Math.max(1, Math.min(8, w)));
  }

  setGuests(g: number): void {
    this.guests.set(Math.max(1, Math.min(4, g)));
  }
}
