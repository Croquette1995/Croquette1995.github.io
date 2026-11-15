import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LINKS_REPOSITORY } from '../repositories/links.repository';
import { LinksDirectory, RestaurantGuide } from '../models/entities/links.entity';

@Injectable({ providedIn: 'root' })
export class LinksService {
  private repo = inject(LINKS_REPOSITORY);

  readonly linksResource = rxResource<LinksDirectory, unknown>({
    stream: () => this.repo.getLinks()
  });

  readonly linksDirectory = computed<LinksDirectory | undefined>(() => this.linksResource.value());
  readonly restaurantGuide = computed<RestaurantGuide | undefined>(() => this.linksDirectory()?.restaurantGuide);
  readonly isLoading = computed<boolean>(() => this.linksResource.isLoading());
}
