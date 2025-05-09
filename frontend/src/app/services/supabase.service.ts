import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async signIn(email: string, password: string) {
    return await this.supabaseClient.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return await this.supabaseClient.auth.signUp({ email, password });
  }

  async signOut() {
    return await this.supabaseClient.auth.signOut();
  }

  async getUser() {
    const { data: { user } } = await this.supabaseClient.auth.getUser();
    return user;
  }

  async getSession() {
    const { data: { session } } = await this.supabaseClient.auth.getSession();
    return session;
  }

  async updateUser(updates: { email?: string; password?: string; data?: any }) {
    return await this.supabaseClient.auth.updateUser(updates);
  }
} 