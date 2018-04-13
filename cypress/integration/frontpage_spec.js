describe('Inngangsvilkår', () => {
    it('Kvinne over 18 år kommer inn', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/default.json');

        cy.visit('/engangsstonad');
        cy.get('#js-intro').should('exist');
    });

    it('Bruker under 18 år får info om hvordan de under 18 søker', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/under18.json');

        cy.visit('/engangsstonad');
        cy.get('#js-ikkeMyndig').should('exist');
    });

    it('Mannlig bruker får info om hvorfor de ikke kan søke', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/male.json');

        cy.visit('/engangsstonad');
        cy.get('#js-erMann').should('exist');
    });
});
