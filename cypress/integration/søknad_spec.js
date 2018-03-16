import moment from 'moment';

describe('Søknad', () => {
    describe('common flow', () => {
        before(() => {
            cy.visit('/engangsstonad');
        });

        describe('steg1', () => {
            it('Should check egenerklæring og go to next step', () => {
                cy.get('input[name="egenerklaring"]')
                    .not('[disabled]')
                    .check({ force: true })
                    .should('be.checked');
    
                cy.get('button').click();
            });
    
            it('Should check fødsel ahead', () => {
                cy.get('#js-fodselFremtid')
                    .not('[disabled]')
                    .check({ force: true })
                    .should('be.checked');
    
            });
    
            it('Should check one child', () => {
                cy.get('#js-ettBarn')
                    .not('[disabled]')
                    .check({ force: true })
                    .should('be.checked');
            });
    
            it('Should fill out termindato', () => {
                cy.get('#termindato').type(moment().add(1,'days').format('DDMMYYYY'));
            });
    
            it('Should upload an attachment', () => {
                const dropEvent = {
                    dataTransfer: {
                        files: [],
                    },
                };
                cy.fixture('terminbekreftelse.pdf','base64').then((pdf) => { 
                    return Cypress.Blob.base64StringToBlob(pdf, 'application/pdf').then((blob) => {
                        dropEvent.dataTransfer.files.push(new File([blob], 'terminbekreftelse.pdf', {type: "application/pdf"} ));
                    });
                });
                cy.get('.attachmentButton').trigger('drop', dropEvent);
                cy.contains('terminbekreftelse.pdf');
            });
    
            it('Should fill out terminbekreftelse date', () => {
                cy.get('#terminbekreftelse').type(moment().subtract(10,'days').format('DDMMYYYY'));
            });
    
            it('Should navigate to steg2', () => {
                cy.get('button.js-fortsettKnapp').click();
            });
        });

        describe('steg2', () => {
            it('Should fill out name for other parent', () => {
                cy.get('#js-annenForelder').type('Ola Nordmann');
            });

            it('Should fill out id number for other parent', () => {
                cy.get('#js-fødselsnummer').type('32543211563');
            });

            it('Should navigate to steg3', () => {
                cy.get('button.js-fortsettKnapp').click();
            });
        });

        describe('steg3', () => {
            it('Should check i Norge siste 12', () => {
                cy.get('#js-iNorgeSiste12').check();
            });

            it('Should check i Norge neste 12 ', () => {
                cy.get('#js-iNorgeNeste12').check();
            });

            it('Should check fødsel i Norge', () => {
                cy.get('#js-fodselINorge').check();
            });

            it('Should navigate to steg4', () => {
                cy.get('button.js-fortsettKnapp').click();
            });
        });

        describe('steg4', () => {
            it('Should confirm and submit', () => {
                cy.get('input[name="bekreftOpplysninger"]')
                    .not('[disabled]')
                    .check({ force: true })
                    .should('be.checked');

                cy.get('button[type=submit]').click();
            });
        });
    });
});
