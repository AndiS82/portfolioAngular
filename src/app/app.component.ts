import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme-service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    const darkModeEnabled = localStorage.getItem('darkMode');
    if (darkModeEnabled !== null) {
      this.themeService.darkMode = JSON.parse(darkModeEnabled);
    }
  }
}
