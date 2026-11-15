import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalConditions } from '../models/entities/conditions.entity';

export interface ConditionsRepository {
  getConditions(): Observable<RentalConditions>;
}

export const CONDITIONS_REPOSITORY = new InjectionToken<ConditionsRepository>('CONDITIONS_REPOSITORY');
