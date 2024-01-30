import {
  FormStyle,
  TranslationWidth,
  getLocaleDayNames,
} from '@angular/common';
import { Component, LOCALE_ID, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = $localize`i18n-runtime-example`;
  LOCALE_ID = inject(LOCALE_ID);
  dayNames = getLocaleDayNames(
    this.LOCALE_ID,
    FormStyle.Format,
    TranslationWidth.Wide
  );
}
