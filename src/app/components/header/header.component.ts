import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { LanguageService } from 'src/app/services/language-service/language.service';
import { ThemeService } from 'src/app/services/theme-service/theme.service';
import { takeUntil } from 'rxjs/operators';
import DE from '../../../assets/lang/DE.json';
import EN from '../../../assets/lang/EN.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  imageURL = '../../../assets/img/hello.png';
  private componentDestroyed$: Subject<void> = new Subject<void>();
  language = 'DE';
  lang = DE;
  darkMode = false;
  modeIcon = 'light_mode';
  menuActive = false;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateImageURL(event.url);
        }
      });
  }

  updateImageURL(url: string) {
    if (url === '/') {
      this.imageURL = '../../../assets/img/hello.png';
    } else if (url === '/about') {
      this.imageURL = '../../../assets/img/about.png';
    } else if (url === '/contact') {
      this.imageURL = '../../../assets/img/contact.png';
    } else if (url === '/skills') {
      this.imageURL = '../../../assets/img/skills.png';
    } else if (url === '/projects') {
      this.imageURL = '../../../assets/img/work.png';
    } else {
      this.imageURL = '../../../assets/img/error.png';
    }
  }

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

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
