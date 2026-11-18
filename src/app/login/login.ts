import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private servicio = inject(Auth)
  loading = signal(false)
  error = signal('')

  readonly formulario = new FormGroup({
    usuario: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });


  invalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.touched && control.invalid;
  }

  envio(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const { usuario, password } = this.formulario.getRawValue();
    this.loading.set(true)
    this.servicio.login(usuario,password).subscribe({
      next:()=>{
        // Cuando todo sale bien
        this.loading.set(false)
        console.log("Listo");
      },
      error : (error) =>{
        this.loading.set(false)
        this.error.set(
          error.status === 401 ? 'Usuario o Contraseña Incorrecta...':
          'No se puede conectar espere mas tarde...'
        )
      }
    })
  }
}