import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ConditionsRepository } from '../conditions.repository';
import { RentalConditions } from '../../models/entities/conditions.entity';
import { ConditionsDto } from '../../models/dtos/conditions.dto';
import { ConditionsMapper } from '../../mappers/conditions.mapper';

@Injectable({ providedIn: 'root' })
export class JsonConditionsRepository implements ConditionsRepository {
  private http = inject(HttpClient);

  getConditions(): Observable<RentalConditions> {
    return this.http.get<ConditionsDto>('/data/conditions.json').pipe(
      map(dto => ConditionsMapper.toEntity(dto))
    );
  }
}
