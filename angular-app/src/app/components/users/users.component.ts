import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserService[] = [];
  loading = false;
  error: string | null = null;
  selectedUser: UserService | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    this.error = null;
    
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.error('Error loading users:', error);
      this.error = 'Failed to load users. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  async selectUser(user: UserService) {
    if (this.selectedUser?.id === user.id) {
      this.selectedUser = null;
      return;
    }

    try {
      this.selectedUser = await this.userService.getUserById(user.id!);
    } catch (error) {
      console.error('Error loading user details:', error);
      this.error = 'Failed to load user details.';
    }
  }

  trackByUserId(index: number, user: UserService): number {
    return user.id || index;
  }
}