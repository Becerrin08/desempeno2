import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-nadvar',
  styleUrl: './nadvar.css',
  templateUrl: './nadvar.html',
})
export class Nadvar {
  protected auth = inject(Auth);
  private router = inject(Router);

  salir(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
