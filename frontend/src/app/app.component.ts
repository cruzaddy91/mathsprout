import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './shared/components/logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogoComponent],
  template: `
    <div class="min-h-screen bg-[#D4F5D4]">
      <div class="container mx-auto px-4 py-8">
        <app-logo size="large" class="mb-8"></app-logo>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'MathSprout';
} 