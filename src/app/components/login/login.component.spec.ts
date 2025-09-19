import { ReactiveFormsModule } from '@angular/forms';
import { Login } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with required validators', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('username')?.hasError('required')).toBeTruthy();
    expect(component.loginForm.get('password')?.hasError('required')).toBeTruthy();
  });

  it('should render login form elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('h2')?.textContent).toContain('Login');
    expect(compiled.querySelector('input[formControlName="username"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="password"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should have submit button disabled when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.loginForm.patchValue({
      username: 'testuser',
      password: 'testpass'
    });
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should show error messages for empty fields when touched', () => {
    // Marcar campos como touched
    component.loginForm.get('username')?.markAsTouched();
    component.loginForm.get('password')?.markAsTouched();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const errorMessages = compiled.querySelectorAll('.error-message');
    
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].textContent).toContain('Usuário é obrigatório');
    expect(errorMessages[1].textContent).toContain('Senha é obrigatória');
  });

  it('should show success message for valid credentials', () => {
    component.loginForm.patchValue({
      username: 'admin',
      password: '123456'
    });
    component.onSubmit();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('.login-message');
    
    expect(message).toBeTruthy();
    expect(message?.textContent).toContain('Login realizado com sucesso!');
    expect(message?.classList.contains('success')).toBeTruthy();
  });

  it('should show error message for invalid credentials', () => {
    component.loginForm.patchValue({
      username: 'wronguser',
      password: 'wrongpass'
    });
    component.onSubmit();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('.login-message');
    
    expect(message).toBeTruthy();
    expect(message?.textContent).toContain('Usuário ou senha inválidos!');
    expect(message?.classList.contains('error')).toBeTruthy();
  });

  it('should update form values when inputs change', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usernameInput = compiled.querySelector('input[formControlName="username"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[formControlName="password"]') as HTMLInputElement;
    
    usernameInput.value = 'newuser';
    usernameInput.dispatchEvent(new Event('input'));
    
    passwordInput.value = 'newpass';
    passwordInput.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    
    expect(component.loginForm.get('username')?.value).toBe('newuser');
    expect(component.loginForm.get('password')?.value).toBe('newpass');
  });

  it('should have correct CSS classes applied', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.login-container')).toBeTruthy();
    expect(compiled.querySelector('.form-group')).toBeTruthy();
    expect(compiled.querySelector('.form-control')).toBeTruthy();
    expect(compiled.querySelector('.submit-button')).toBeTruthy();
  });

  it('should have getters for form controls', () => {
    expect(component.username).toBe(component.loginForm.get('username'));
    expect(component.password).toBe(component.loginForm.get('password'));
  });

  it('should validate form state correctly', () => {
    expect(component.loginForm.invalid).toBeTruthy();
    
    component.loginForm.patchValue({
      username: 'admin',
      password: '123456'
    });
    
    expect(component.loginForm.valid).toBeTruthy();
  });
});
