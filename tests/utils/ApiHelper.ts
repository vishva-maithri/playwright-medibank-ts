import { APIRequestContext, expect } from '@playwright/test';
import { TestDataManager } from '../data/TestDataManager';

export interface User {
  id?: number;
  name: string;
  email: string;
  username: string;
}

export class ApiHelper {
  private request: APIRequestContext;
  private testData: TestDataManager;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.testData = TestDataManager.getInstance();
    this.baseURL = this.testData.getApiUrl();
  }

  async getUsers(): Promise<User[]> {
    const response = await this.request.get(`${this.baseURL}/users`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async getUserById(id: number): Promise<User> {
    const response = await this.request.get(`${this.baseURL}/users/${id}`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await this.request.post(`${this.baseURL}/users`, {
      data: user
    });
    expect(response.status()).toBe(201);
    return response.json();
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response = await this.request.put(`${this.baseURL}/users/${id}`, {
      data: user
    });
    expect(response.status()).toBe(200);
    return response.json();
  }

  async deleteUser(id: number): Promise<void> {
    const response = await this.request.delete(`${this.baseURL}/users/${id}`);
    expect(response.status()).toBe(200);
  }

  async getPosts(): Promise<any[]> {
    const response = await this.request.get(`${this.baseURL}/posts`);
    expect(response.status()).toBe(200);
    return response.json();
  }
}