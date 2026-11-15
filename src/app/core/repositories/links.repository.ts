import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LinksDirectory } from '../models/entities/links.entity';

export interface LinksRepository {
  getLinks(): Observable<LinksDirectory>;
}

export const LINKS_REPOSITORY = new InjectionToken<LinksRepository>('LINKS_REPOSITORY');
