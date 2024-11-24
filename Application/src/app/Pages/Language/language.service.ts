import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('pt');
  currentLanguage = this.languageSubject.asObservable();

  constructor() { }

  changeLanguage(language: string) {
    this.languageSubject.next(language);
  }
}