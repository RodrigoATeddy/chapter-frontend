import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  router = inject(Router);

  loginForm: FormGroup;
  loginMessage = signal('');
  isLoginSuccessful = signal(false);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      // Simulação de validação de login
      if (username === 'admin' && password === '123456') {
        this.loginMessage.set('Login realizado com sucesso!');
        this.isLoginSuccessful.set(true);
        this.router.navigate(['/home']);
      } else {
        this.loginMessage.set('Usuário ou senha inválidos!');
        this.isLoginSuccessful.set(false);
      }
    } else {
      // Marcar todos os campos como touched para mostrar erros
      this.loginForm.markAllAsTouched();
    }
  }

  // Getters para facilitar o acesso aos controles no template
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
