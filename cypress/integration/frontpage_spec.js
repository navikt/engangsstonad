describe('Inngangsvilkår', () => {
    it('Kvinne over 18 år kommer inn', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/default.json');

        cy.visit('/engangsstonad');
        cy.contains('Velkommen til søknad om engangsstønad');
    });

    it('Bruker under 18 år får info om hvordan de under 18 søker', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/under18.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad');
        cy.contains('under 18 år') // TODO: Burde bruke en hook (klasse e.l.) i stedet for tekst
    });

    it('Mannlig bruker får info om hvorfor de ikke kan søke', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/male.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad');
        cy.contains('registrert som mann'); // TODO: Burde bruke en hook (klasse e.l.) i stedet for tekst
    });
});
