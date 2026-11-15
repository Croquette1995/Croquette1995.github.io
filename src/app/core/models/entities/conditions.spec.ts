import { describe, it, expect } from 'vitest';
import { RentalConditions } from './conditions.entity';

describe('RentalConditions Entity', () => {
  const conditions = new RentalConditions(
    'test-cond',
    350,
    'EUR',
    2,
    4,
    6,
    200,
    25,
    7,
    'test@example.com',
    'https://facebook.com',
    []
  );

  it('should calculate price for 2 guests for 1 week', () => {
    const res = conditions.calculatePrice(1, 2);
    expect(res.basePrice).toBe(350);
    expect(res.extraGuestsCharge).toBe(0);
    expect(res.refundableDeposit).toBe(200);
    expect(res.totalWithoutDeposit).toBe(350);
    expect(res.totalWithDeposit).toBe(550);
    expect(res.depositDueNow).toBe(88); // 25% of 350
  });

  it('should add extra guest charges for 4 guests for 2 weeks', () => {
    const res = conditions.calculatePrice(2, 4);
    // 2 extra guests * 6€/day * 14 days = 168€
    expect(res.basePrice).toBe(700);
    expect(res.extraGuestsCharge).toBe(168);
    expect(res.totalWithoutDeposit).toBe(868);
    expect(res.totalWithDeposit).toBe(1068);
  });
});
