import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import 'hammerjs';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
