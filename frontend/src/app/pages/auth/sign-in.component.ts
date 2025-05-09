import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { InputFieldComponent } from './input-field.component';
import { ButtonComponent } from './button.component';
import { GoogleButtonComponent } from './google-button.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, ButtonComponent, GoogleButtonComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
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
              Sign in
            </app-button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6">
            <app-google-button></app-google-button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async onSubmit() {
    try {
      const { data, error } = await this.supabaseService.signIn(this.email, this.password);
      
      if (error) {
        console.error('Error signing in:', error.message);
        return;
      }

      if (data?.user) {
        // Check if user profile exists
        const { data: profile } = await this.supabaseService.supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (!profile) {
          // Create user profile if it doesn't exist
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
        }

        // Get updated user data
        const user = await this.supabaseService.getUser();
        if (user) {
          // Redirect based on user role
          const role = user.user_metadata?.['role'] || 'student';
          this.router.navigate([`/${role}-dashboard`]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
} 