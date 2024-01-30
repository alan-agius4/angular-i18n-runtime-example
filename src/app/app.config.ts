import { ApplicationConfig, inject, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DOCUMENT, registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const localeData = {
  'de-DE': () => import('@angular/common/locales/de'),
  // List all other locales here.
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const locale = 'de-DE';
        const http = inject(HttpClient);
        const doc = inject(DOCUMENT);

        return async () => {
          // Set document language
          doc.documentElement.lang = locale;

          // load and register locale data
          const { default: data } = await localeData[locale]();
          // The signature registerLocaleData(data: any, extraData?: any) is deprecated since v5.1 but there does not appear to be an alternative.
          registerLocaleData(data, locale);

          // Set $localize locale which will also set LOCALE_ID
          $localize.locale = locale;

          // load and register translations
          // The below can be loaded either via HTTP or dynamic import
          const res = await lastValueFrom<any>(
            http.get(`/assets/translations/${locale}.json`)
          );

          loadTranslations((res as any).translations);
        };
      },
    },
  ],
};
