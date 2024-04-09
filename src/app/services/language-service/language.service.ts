import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import DE from '../../../assets/lang/DE.json';
import EN from '../../../assets/lang/EN.json';
import { ILanguage } from '../../interfaces/Itranslation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _language: BehaviorSubject<string> = new BehaviorSubject<string>(
    'DE'
  );
  public language$: Observable<string> = this._language.asObservable();
  language = '';

  setValue(language: string): void {
    this._language.next(language);
    this.language = language;
  }

  getValue() {
    return this.language;
  }
}
