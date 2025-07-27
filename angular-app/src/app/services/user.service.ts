import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserService {
  id?: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getUsers(): Promise<UserService[]> {
    return firstValueFrom(
      this.http.get<UserService[]>(`${this.apiUrl}/users`)
    );
  }

  async getUserById(id: number): Promise<UserService> {
    return firstValueFrom(
      this.http.get<UserService>(`${this.apiUrl}/users/${id}`)
    );
  }

  async createUser(user: Partial<UserService>): Promise<UserService> {
    return firstValueFrom(
      this.http.post<UserService>(`${this.apiUrl}/users`, user)
    );
  }

  async updateUser(id: number, user: Partial<UserService>): Promise<UserService> {
    return firstValueFrom(
      this.http.put<UserService>(`${this.apiUrl}/users/${id}`, user)
    );
  }

  async deleteUser(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/users/${id}`)
    );
  }
}