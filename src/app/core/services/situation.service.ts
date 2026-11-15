import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SITUATION_REPOSITORY } from '../repositories/situation.repository';
import { LocationGuide, MustSeeSpot } from '../models/entities/location.entity';

@Injectable({ providedIn: 'root' })
export class SituationService {
  private repo = inject(SITUATION_REPOSITORY);

  readonly situationResource = rxResource<LocationGuide, unknown>({
    stream: () => this.repo.getSituation()
  });

  readonly situation = computed<LocationGuide | undefined>(() => this.situationResource.value());
  readonly mustSeeSpots = computed<MustSeeSpot[]>(() => this.situation()?.mustSee ?? []);
  readonly isLoading = computed<boolean>(() => this.situationResource.isLoading());
}
