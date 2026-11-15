import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LinksRepository } from '../links.repository';
import { LinksDirectory } from '../../models/entities/links.entity';
import { LinksDto } from '../../models/dtos/links.dto';
import { LinksMapper } from '../../mappers/links.mapper';

@Injectable({ providedIn: 'root' })
export class JsonLinksRepository implements LinksRepository {
  private http = inject(HttpClient);

  getLinks(): Observable<LinksDirectory> {
    return this.http.get<LinksDto>('/data/links.json').pipe(
      map(dto => LinksMapper.toEntity(dto))
    );
  }
}
