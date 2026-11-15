import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Apartment } from '../models/entities/apartment.entity';

export interface ApartmentRepository {
  getApartment(): Observable<Apartment>;
}

export const APARTMENT_REPOSITORY = new InjectionToken<ApartmentRepository>('APARTMENT_REPOSITORY');
