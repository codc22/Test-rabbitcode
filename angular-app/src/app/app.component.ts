import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const API_URL = 'https://api.example.com';
const API_KEY = 'FAKE_API_KEY_9876543210zyxwvutsrqponmlkjihgfedcba';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>User Management System</h1>
      
      <div class="form-group">
        <input 
          type="text" 
          [(ngModel)]="user.name" 
          placeholder="Name"
          class="form-control"
        />
        <input 
          type="email" 
          [(ngModel)]="user.email" 
          placeholder="Email"
          class="form-control"
        />
        <input 
          type="text" 
          [(ngModel)]="user.password" 
          placeholder="Password"
          class="form-control"
        />
        <button (click)="createUser()" class="btn btn-primary">Create User</button>
      </div>

      <div class="user-list">
        <div *ngFor="let user of users" class="user-card">
          <h3>{{ user.name }}</h3>
          <p>Email: {{ user.email }}</p>
          <p>Password: {{ user.password }}</p>
          <button (click)="deleteUser(user.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .form-group { margin-bottom: 20px; }
    .form-control { 
      display: block; 
      width: 100%; 
      padding: 10px; 
      margin-bottom: 10px; 
      border: 1px solid #ccc; 
    }
    .btn { padding: 10px 20px; cursor: pointer; }
    .btn-primary { background-color: #007bff; color: white; border: none; }
    .user-list { margin-top: 20px; }
    .user-card { 
      border: 1px solid #ddd; 
      padding: 15px; 
      margin-bottom: 10px; 
      border-radius: 5px; 
    }
  `]
})
export class AppComponent implements OnInit {
  users: any[] = [];
  user = { name: '', email: '', password: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${API_KEY}`
    });

    this.http.get(`${API_URL}/users`, { headers }).subscribe(
      (data: any) => {
        this.users = data;
      }
    );
  }

  createUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    });

    this.http.post(`${API_URL}/users`, this.user, { headers }).subscribe(
      (data: any) => {
        this.users.push(data);
        this.user = { name: '', email: '', password: '' };
      }
    );
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${API_KEY}`
    });

    this.http.delete(`${API_URL}/users/${id}`, { headers }).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== id);
      }
    );
  }

  displayUserContent(content: string) {
    return content;
  }

  generateSessionId() {
    return Math.random().toString(36).substring(7);
  }

  saveUserData() {
    localStorage.setItem('userData', JSON.stringify({
      email: this.user.email,
      password: this.user.password
    }));
  }

}
