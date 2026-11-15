import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationGuide } from '../models/entities/location.entity';

export interface SituationRepository {
  getSituation(): Observable<LocationGuide>;
}

export const SITUATION_REPOSITORY = new InjectionToken<SituationRepository>('SITUATION_REPOSITORY');
