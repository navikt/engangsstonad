describe('Frontpage', () => {
    it('Should load without errors', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/default.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad')
    })

    it('Should load underage-page for user under 18 years', () => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/under18.json');

        cy.visit('/engangsstonad');
        cy.contains('Søknad om engangsstønad')
        cy.url().should('contains', '/underAge')
    })

    // it('Should load male-page for male users', () => {
    //     cy.server();
    //     cy.route('GET', '**/personinfo*', 'fixture:users/male.json');
    //
    //     cy.visit('/engangsstonad');
    //     cy.contains('Søknad om engangsstønad')
    //     cy.url().should('contains', '/male')
    // })
});
