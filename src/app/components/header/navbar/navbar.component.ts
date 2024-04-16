import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service/language.service';
import { ThemeService } from 'src/app/services/theme-service/theme.service';

import DE from '../../../../assets/lang/DE.json';
import EN from '../../../../assets/lang/EN.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  language = 'DE';
  lang = DE;
  darkMode = false;
  modeIcon = 'light_mode';
  menuActive = false;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  contact() {
    this.router.navigate(['/contact']);
    this.toggleMenu();
  }

  chooseLanguage() {
    this.language = this.language === 'DE' ? 'EN' : 'DE';
    this.lang = this.language === 'DE' ? DE : EN;
    this.languageService.setValue(this.language);
  }

  toggleMode() {
    this.themeService.toggleDarkMode();
    this.modeIcon = this.modeIcon === 'light_mode' ? 'dark_mode' : 'light_mode';
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
