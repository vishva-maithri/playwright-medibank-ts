import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCount = 0;
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    this.error = null;
    
    try {
      const users = await this.userService.getUsers();
      this.userCount = users.length;
    } catch (error) {
      console.error('Error loading users:', error);
      this.error = 'Failed to load users. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}