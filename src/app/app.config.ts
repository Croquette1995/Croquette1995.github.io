import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/transloco/transloco.loader';

import { APARTMENT_REPOSITORY } from './core/repositories/apartment.repository';
import { JsonApartmentRepository } from './core/repositories/json/json-apartment.repository';
import { CONDITIONS_REPOSITORY } from './core/repositories/conditions.repository';
import { JsonConditionsRepository } from './core/repositories/json/json-conditions.repository';
import { SITUATION_REPOSITORY } from './core/repositories/situation.repository';
import { JsonSituationRepository } from './core/repositories/json/json-situation.repository';
import { LINKS_REPOSITORY } from './core/repositories/links.repository';
import { JsonLinksRepository } from './core/repositories/json/json-links.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'es', 'en', 'ro', 'nl', 'it'],
        defaultLang: 'fr',
        fallbackLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      },
      loader: TranslocoHttpLoader
    }),

    // Pluggable Repositories: Swap to PocketBaseApartmentRepository when backend is ready!
    { provide: APARTMENT_REPOSITORY, useClass: JsonApartmentRepository },
    { provide: CONDITIONS_REPOSITORY, useClass: JsonConditionsRepository },
    { provide: SITUATION_REPOSITORY, useClass: JsonSituationRepository },
    { provide: LINKS_REPOSITORY, useClass: JsonLinksRepository }
  ]
};

