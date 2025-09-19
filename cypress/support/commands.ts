/// <reference types="cypress" />

// Comandos personalizados para os testes de login
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para fazer login com credenciais válidas
       */
      loginWithValidCredentials(): Chainable<void>
      
      /**
       * Comando personalizado para fazer login com credenciais inválidas
       */
      loginWithInvalidCredentials(): Chainable<void>
      
      /**
       * Comando personalizado para preencher o formulário de login
       */
      fillLoginForm(username: string, password: string): Chainable<void>
    }
  }
}

// Comando para login com credenciais válidas
Cypress.Commands.add('loginWithValidCredentials', () => {
  cy.get('input[formControlName="username"]').type('admin');
  cy.get('input[formControlName="password"]').type('123456');
  cy.get('button[type="submit"]').click();
});

// Comando para login com credenciais inválidas
Cypress.Commands.add('loginWithInvalidCredentials', () => {
  cy.get('input[formControlName="username"]').type('wronguser');
  cy.get('input[formControlName="password"]').type('wrongpass');
  cy.get('button[type="submit"]').click();
});

// Comando para preencher o formulário de login
Cypress.Commands.add('fillLoginForm', (username: string, password: string) => {
  cy.get('input[formControlName="username"]').clear().type(username);
  cy.get('input[formControlName="password"]').clear().type(password);
});

export {};