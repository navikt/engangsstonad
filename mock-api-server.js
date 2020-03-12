const express = require('express');
const server = express();
const multer = require('multer');
const morgan = require('morgan');
require('dotenv').config();

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

const delayAllResponses = function(millsec) {
    return function(req, res, next) {
        setTimeout(next, millsec);
    };
};

server.use(morgan('tiny'));
server.use(allowCrossDomain);
server.use(delayAllResponses(500));
server.use(express.json());

const mockResponse = {
    søker: {
        fnr: '11076931536',
        fornavn: 'ROBUST',
        etternavn: 'KAMELEON',
        kjønn: 'K',
        fødselsdato: '1969-07-11',
        land: 'NO',
        ikkeNordiskEøsLand: false,
        barn: [
            {
                fnr: '01101992302',
                fornavn: 'VAKKER',
                etternavn: 'KAKKERLAKK',
                kjønn: 'M',
                fødselsdato: '2019-10-01',
                annenForelder: {
                    fnr: '23018821850',
                    fornavn: 'BRÅKETE',
                    etternavn: 'TRANFLASKE',
                    fødselsdato: '1988-01-23'
                }
            }
        ]
    },
    arbeidsforhold: [
        {
            arbeidsgiverId: '973861778',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'EQUINOR ASA, AVD STATOIL SOKKELVIRKSOMHET',
            stillingsprosent: 100,
            fom: '2016-01-01'
        }
    ]
};

const kvittering = {
    motattDato: '2019-02-19T13:40:45.115',
    referanseId: '3959c880-83d2-4f01-b107-035fa7693758',
    leveranseStatus: 'PÅ_VENT',
    journalId: '439772941'
};

const startServer = (html) => {
    server.get(['/', '/rest/sokerinfo?'], (req, res) => {
        res.send(mockResponse);
    });

    server.get('/rest/storage', (req, res) => {
        res.sendStatus(200);
    });

    server.post('/rest/storage/vedlegg', (req, res) => {
        res.setHeader('Location', `http://localhost:8080/engangsstonad/dist/vedlegg/${req.body.id}`);
        res.sendStatus(201);
    });

    server.delete('/rest/storage/vedlegg/:id', (req, res) => {
        res.sendStatus(204);
    });

    server.post('/rest/soknad', (req, res) => {
        res.send(kvittering);
    });

    server.post('/rest/storage/vedlegg', (req, res) => {
        res.setHeader('Location', `http://localhost:8080/foreldrepengesoknad/dist/vedlegg/${req.body.id}`);
        res.sendStatus(201);
    });

    const port = process.env.PORT || 8888;
    server.listen(port, () => {
        console.log(`Mock-api listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

startServer();
