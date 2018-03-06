describe('Frontpage', () => {
    it('Should load without errors', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/default.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad');
    });

    it('Should load underage-page for user under 18 years', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/under18.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad');
        cy.contains('under 18 år') // TODO: Burde bruke en hook (klasse e.l.) i stedet for tekst
    });

    it('Should load male-page for male users', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/male.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad');
        cy.contains('registrert som mann'); // TODO: Burde bruke en hook (klasse e.l.) i stedet for tekst
    });
});
