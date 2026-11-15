import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApartmentRepository } from '../apartment.repository';
import { Apartment } from '../../models/entities/apartment.entity';
import { ApartmentDto } from '../../models/dtos/apartment.dto';
import { ApartmentMapper } from '../../mappers/apartment.mapper';

/**
 * Concrete implementation reading from local JSON asset.
 * When switching to PocketBase, create PocketBaseApartmentRepository
 * implementing ApartmentRepository and change the provider in app.config.ts.
 */
@Injectable({ providedIn: 'root' })
export class JsonApartmentRepository implements ApartmentRepository {
  private http = inject(HttpClient);

  getApartment(): Observable<Apartment> {
    return this.http.get<ApartmentDto>('/data/apartment.json').pipe(
      map(dto => ApartmentMapper.toEntity(dto))
    );
  }
}
