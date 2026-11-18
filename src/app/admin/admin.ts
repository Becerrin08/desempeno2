import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Auth } from '../services/auth'; 

@Component({
  imports: [],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {
    protected auth = inject(Auth);
}
