describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should have submit button disabled when form is empty', () => {
    // Verificar se o botão está desabilitado quando o formulário está vazio
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should show error message for invalid credentials', () => {
    // Preencher com credenciais inválidas
    cy.get('input[formControlName="username"]').type('wronguser');
    cy.get('input[formControlName="password"]').type('wrongpass');
    
    // Submeter o formulário
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de erro
    cy.get('.login-message').should('be.visible');
    cy.get('.login-message').should('contain', 'Usuário ou senha inválidos!');
    cy.get('.login-message').should('have.class', 'error');
  });

  it('should update form values when typing', () => {
    // Digitar no campo de usuário
    cy.get('input[formControlName="username"]').type('newuser');
    cy.get('input[formControlName="username"]').should('have.value', 'newuser');
    
    // Digitar no campo de senha
    cy.get('input[formControlName="password"]').type('newpass');
    cy.get('input[formControlName="password"]').should('have.value', 'newpass');
  });

  it('should show different messages for multiple login attempts', () => {
    // Primeira tentativa com credenciais inválidas
    cy.get('input[formControlName="username"]').type('wronguser');
    cy.get('input[formControlName="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    cy.get('.login-message').should('contain', 'Usuário ou senha inválidos!');
    
    // Limpar e tentar com credenciais válidas
    cy.get('input[formControlName="username"]').clear().type('admin');
    cy.get('input[formControlName="password"]').clear().type('123456');
    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:4200/home');

    cy.get('h1').should('contain', 'Cheguei no Dashboard');
  });
});