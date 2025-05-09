import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { InputFieldComponent } from './input-field.component';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-sign-up-card',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, ButtonComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <app-input-field
              type="email"
              placeholder="Email address"
              [(ngModel)]="email"
              name="email"
              [required]="true"
            ></app-input-field>
            <app-input-field
              type="password"
              placeholder="Password"
              [(ngModel)]="password"
              name="password"
              [required]="true"
            ></app-input-field>
          </div>

          <div>
            <app-button type="submit">
              Sign up
            </app-button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class SignUpCardComponent {
  email: string = '';
  password: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async onSubmit() {
    try {
      const { data, error } = await this.supabaseService.signUp(this.email, this.password);
      
      if (error) {
        console.error('Error signing up:', error.message);
        return;
      }

      if (data?.user) {
        // Create user profile
        const { error: updateError } = await this.supabaseService.updateUser({
          data: {
            email: this.email,
            role: 'student' // Default role
          }
        });

        if (updateError) {
          console.error('Error creating profile:', updateError.message);
          return;
        }

        // Redirect to sign in page
        this.router.navigate(['/sign-in']);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
