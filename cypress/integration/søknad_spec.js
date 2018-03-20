import moment from 'moment';

describe('Søknad', () => {

    before(() => {
        cy.server();
        cy.route('GET', '**/personinfo*', 'fixture:users/default.json');
        cy.visit('/engangsstonad');
    });

    describe('Egenerklæring', () => {
        it('Huker av egenerklæring og går videre', () => {
            cy.get('input[name="egenerklaring"]')
                .not('[disabled]')
                .check({force: true})
                .should('be.checked');
            cy.get('button').click();
        });
    });

    describe('Informasjon om barnet', () => {
        it('Fremtidig fødsel', () => {
            cy.get('#js-fodselFremtid')
                .not('[disabled]')
                .check({force: true})
                .should('be.checked');

        });

        it('Ett barn', () => {
            cy.get('#js-ettBarn')
                .not('[disabled]')
                .check({force: true})
                .should('be.checked');
        });

        it('Termindato', () => {
            cy.get('#termindato').type(moment().add(1, 'days').format('DDMMYYYY'));
        });

        it('Laster opp vedlegg (terminbekreftelse)', () => {
            const dropEvent = {
                dataTransfer: {
                    files: [],
                },
            };
            cy.fixture('terminbekreftelse.pdf', 'base64').then((pdf) => {
                return Cypress.Blob.base64StringToBlob(pdf, 'application/pdf').then((blob) => {
                    dropEvent.dataTransfer.files.push(new File([blob], 'terminbekreftelse.pdf', {type: "application/pdf"}));
                });
            });
            cy.get('.attachmentButton').trigger('drop', dropEvent);
            cy.contains('terminbekreftelse.pdf');
        });

        it('Terminbekreftelsesdato', () => {
            cy.get('#terminbekreftelse').type(moment().subtract(10, 'days').format('DDMMYYYY'));
        });

        it('Går videre til neste side', () => {
            cy.get('button.js-fortsettKnapp').click();
        });
    });

    describe('Informasjon om den andre forelderen', () => {
        it('Navn', () => {
            cy.get('#js-annenForelder').type('Ola Nordmann');
        });

        it('ID-nummer', () => {
            cy.get('#js-fødselsnummer').type('32543211563');
        });

        it('Vis hjelpetekst', () => {
            cy.get('.hjelpetekst').should('not.have.class', 'hjelpetekst--open');
            cy.get('#fnrHjelpetekstBtn').click();
            cy.get('.hjelpetekst').should('have.class', 'hjelpetekst--open');
            cy.get('#fnrHjelpetekstBtn').click();
            cy.get('.hjelpetekst').should('not.have.class', 'hjelpetekst--open');
        });

        it('Gå videre til neste side', () => {
            cy.get('button.js-fortsettKnapp').click();
        });
    });

    describe('Tilknytning til Norge', () => {
        it('I Norge de siste 12 måneder', () => {
            cy.get('#js-iNorgeSiste12').check();
        });

        it('I Norge de neste 12 måneder', () => {
            cy.get('#js-iNorgeNeste12').check();
        });

        it('Fødsel i Norge', () => {
            cy.get('#js-fodselINorge').check();
        });

        it('Går videre til neste side', () => {
            cy.get('button.js-fortsettKnapp').click();
        });
    });

    describe('Oppsummering', () => {
        it('Bekreft opplysninger og send inn søknad', () => {
            cy.get('input[name="bekreftOpplysninger"]')
                .not('[disabled]')
                .check({force: true})
                .should('be.checked');

            cy.get('button[type=submit]').click();
        });
    });
});
