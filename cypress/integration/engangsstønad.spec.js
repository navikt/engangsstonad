context('Engangsstønad', () => {
    beforeEach(() => {
        cy.server();
    });

    it('søknaden skal være tilgjengelig for myndige kvinner', () => {
        cy.route('GET', '**/personinfo*', 'fixture:person/kvinne.json');
        cy.visit('/');
        cy.get('button[type=submit]button').should('exist');
    });

    it('umyndige kvinner skal møtes med tilpasset forside og søknaden skal ikke være tilgjenglig', () => {
        cy.route('GET', '**/personinfo*', 'fixture:person/kvinne_umyndig.json');
        cy.visit('/');
        cy.get('#js-ikkeMyndig').should('exist');
        cy.get('button[type=submit]button').should('not.exist');
    });

    it('menn skal møtes med tilpasset forside og søknaden skal ikke være tilgjengelig', () => {
        cy.route('GET', '**/personinfo*', 'fixture:person/mann.json');
        cy.visit('/');
        cy.get('#js-erMann').should('exist');
        cy.get('button[type=submit]button').should('not.exist');
    });

    it('skal vise feilside hvis personoppslag har feilet', () => {
        cy.route({
            url: '**/personinfo*',
            status: 500,
            response: ''
        });
        cy.visit('/');
        cy.contains('Det oppstod en feil');
    });

    it('skal vise spinner til applikasjonen har fått personinfo respons', () => {
        cy.route({
            url: '**/personinfo*',
            delay: 2 * 1000,
            response: 'fixture:person/kvinne.json'
        }).as('personinfo');
        cy.visit('/');
        cy.get('.spinner').should('exist');
        cy.wait('@personinfo').then(() => {
            cy.get('.spinner').should('not.exist');
            cy.contains('Velkommen')
        });
    });

    it('skal redirecte til loginservice', () => {
        cy.route({
            url: '**/personinfo*',
            response: '',
            status: 401
        });
        cy.visit('/');
        cy.url().should('eq', 'http://localhost:8080/local/cookie?redirect=http://localhost:8080');
    });
});
