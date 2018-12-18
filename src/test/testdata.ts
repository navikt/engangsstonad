import EngangsstonadSoknad from "app/types/domain/EngangsstonadSoknad";

export const getCompleteSoknad = (): EngangsstonadSoknad => ({
    type: 'engangsstønad',
    erEndringssøknad: false,
    barn: {
        fødselsdatoer: [],
        erBarnetFødt: false,
        antallBarn: 1,
        termindato: new Date('2018-12-13'),
        terminbekreftelseDato: new Date('2018-12-06'),
        terminbekreftelse: [
            {
                id: 'I000062',
                file: {},
                filename: 'Screenshot 2018-12-06 10.05.27.png',
                filesize: 41905,
                uploaded: true,
                pending: false,
                type: 'terminbekreftelse',
                skjemanummer: 'I000062',
                url:
                    'http://localhost:8888/rest/storage/vedlegg/fb8a1052-5673-4dc0-8530-798f1476f40a',
            },
        ],
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
    },
    annenForelder: {},
});