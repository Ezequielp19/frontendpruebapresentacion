import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  
  private readonly darkThemeKey = 'dark-theme';

  constructor() {
    this.applyTheme(this.isDarkTheme());
  }

  toggleTheme(): void {
    const isDark = !this.isDarkTheme();
    localStorage.setItem(this.darkThemeKey, JSON.stringify(isDark));
    this.applyTheme(isDark);
  }

  private isDarkTheme(): boolean {
    return JSON.parse(localStorage.getItem(this.darkThemeKey) || 'false');
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
