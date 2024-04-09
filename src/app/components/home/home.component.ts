import { Component, OnDestroy, OnInit } from '@angular/core';

import DE from '../../../assets/lang/DE.json';
import EN from '../../../assets/lang/EN.json';
import { ILanguage } from 'src/app/interfaces/Itranslation';
import { LanguageService } from 'src/app/services/language-service/language.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  lang = DE;
  language = '';
  private componentDestroyed$ = new Subject<void>();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.language$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.language = data;
        this.lang = this.language === 'DE' ? DE : EN;
        console.log('Language updated:', this.language, this.lang);
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
