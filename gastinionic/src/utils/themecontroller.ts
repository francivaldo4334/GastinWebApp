export class ThemeController {
  theme: "dark" | "light" = "light"
  constructor() {
    this.initializeTheme();
  }

  initializeTheme() {
    let currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
      // Default to dark theme if no theme is set
      currentTheme = 'dark';
      localStorage.setItem('theme', currentTheme);
    }

    this.applyTheme(currentTheme);
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  applyTheme(theme: string) {
    // Update theme and toggle the class
    this.theme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.classList.toggle('ion-palette-dark', theme === 'dark');
  }
}
