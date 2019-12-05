const nb = require('../nb_NO.json');
const nn = require('../nn_NO.json');
const en = require('../en_US.json');

describe('intl tests', () => {
    it('Language files should have exactly the same keys', () => {
        const keysBokmål = Object.keys(nb);
        const keysNynorsk = Object.keys(nn);
        const keysEnglish = Object.keys(en);

        expect(keysBokmål.sort()).toMatchObject(keysNynorsk.sort());
        expect(keysBokmål.sort()).toMatchObject(keysEnglish.sort());

        expect(keysNynorsk.sort()).toMatchObject(keysBokmål.sort());
        expect(keysNynorsk.sort()).toMatchObject(keysEnglish.sort());

        expect(keysEnglish.sort()).toMatchObject(keysBokmål.sort());
        expect(keysEnglish.sort()).toMatchObject(keysNynorsk.sort());
    });
});
