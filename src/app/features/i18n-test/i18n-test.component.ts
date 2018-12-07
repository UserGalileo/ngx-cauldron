import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cn-i18n-test',
  template: `
    <p class="title">{{ 'I18N_TEST.DESCRIPTION' | translate }}</p>
    <mat-form-field>
      <mat-select placeholder="Current language" #select [value]="currentLang" (valueChange)="changeLanguage(select.value)">
        <mat-option value="en">English</mat-option>
        <mat-option value="it">Italiano</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
  `]
})
export class I18nTestComponent {

  constructor(private translate: TranslateService) {}

  get currentLang() {
    return this.translate.currentLang;
  }

  changeLanguage(lang) {
    this.translate.use(lang);
  }
}
