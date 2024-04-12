describe('template spec', () => {
  const year = '2024';
  const month = 'November';

  const process = () => {
    cy.visit(
      'https://ais.usvisa-info.com/en-co/niv/schedule/56491443/appointment',
    );

    cy.get('[id="appointments_consulate_appointment_date"]').click();

    cy.recursionLoop((times) => {
      const $a = Cypress.$('a.ui-state-default');
      const $year = Cypress.$('span.ui-datepicker-year').last();
      const $month = Cypress.$('span.ui-datepicker-month').last();

      if ($year.html() === year && $month.html() === month) {
        cy.get(
          '[name="appointments[consulate_appointment][facility_id]"]',
        ).selectNth(0);
        cy.get(
          '[name="appointments[consulate_appointment][facility_id]"]',
        ).selectNth(1);

        cy.get('[id="appointments_consulate_appointment_date"]').click();
      }
      cy.get('span:Contains(Next)').click();
      return !$a.length;
    });

    cy.get('a[class="ui-state-default"]').first().click();

    cy.get('[name="appointments[consulate_appointment][time]"]').selectNth(1);

    cy.get('[id="appointments_asc_appointment_date"]').click();

    cy.recursionLoop((times) => {
      const $a = Cypress.$('a.ui-state-default');
      const $year = Cypress.$('span.ui-datepicker-year').last();
      const $month = Cypress.$('span.ui-datepicker-month').last();

      if ($year.html() === year && $month.html() === month) {
        cy.get('[name="appointments[asc_appointment][facility_id]"]').selectNth(
          0,
        );
        cy.get('[name="appointments[asc_appointment][facility_id]"]').selectNth(
          1,
        );

        cy.get('[id="appointments_asc_appointment_date"]').click();
      }
      cy.get('span:Contains(Next)').click();
      return !$a.length;
    });

    cy.get('a[class="ui-state-default"]').first().click();

    cy.get('[name="appointments[asc_appointment][time]"]').selectNth(1);
    //cy.pause().getCookie('app');
    cy.get('[type="submit"]').click();
    cy.contains('Are you sure you want to reschedule the appointment?');
    cy.get('a[class="button alert"]').click();
    cy.wait(500);
  };

  beforeEach('get access', () => {
    cy.visit('https://ais.usvisa-info.com/en-co/niv/users/sign_in');

    cy.get(`[id="user_email"]`).type('olgalle4@hotmail.com');
    cy.get(`[id="user_password"]`).type('Chita*1521');
    cy.get('[for="policy_confirmed"]').click();

    cy.get(`[value="Sign In"]`).click();

    cy.wait(500);
    cy.url().should('include', 'groups/39960169');

    /* cy.get('[class="button primary small"]').click();

    cy.url().should('include', 'schedule/56491443/continue_actions');

    cy.contains('Reschedule Appointment').click();

    cy.get('a:Contains(Reschedule Appointment)').click(); */
  });

  it('go to schedule', () => {
    process();
  });
});
