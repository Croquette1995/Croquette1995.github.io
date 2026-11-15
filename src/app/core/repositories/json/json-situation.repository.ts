import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SituationRepository } from '../situation.repository';
import { LocationGuide } from '../../models/entities/location.entity';
import { SituationDto } from '../../models/dtos/situation.dto';
import { SituationMapper } from '../../mappers/situation.mapper';

@Injectable({ providedIn: 'root' })
export class JsonSituationRepository implements SituationRepository {
  private http = inject(HttpClient);

  getSituation(): Observable<LocationGuide> {
    return this.http.get<SituationDto>('/data/situation.json').pipe(
      map(dto => SituationMapper.toEntity(dto))
    );
  }
}
