// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'recursionLoop',
  { times: 'optional' },
  function (fn, times) {
    if (typeof times === 'undefined') {
      times = 0;
    }

    cy.then(() => {
      const result = fn(++times);
      if (result !== false) {
        cy.recursionLoop(fn, times);
      }
    });
  },
);

Cypress.Commands.add(
  'selectNth',
  { prevSubject: 'element' },
  (subject, pos) => {
    cy.wrap(subject)
      .children('option')
      .eq(pos)
      .then((e) => {
        cy.wrap(subject).select(e.val());
      });
  },
);
