import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';

export default {
    cleanupSøknad: (søknad: EngangsstonadSoknad) => {
        const { utenlandsopphold } = søknad;
        const { iNorgeSiste12Mnd, tidligerePerioder } = utenlandsopphold;
        const { iNorgeNeste12Mnd, senerePerioder } = utenlandsopphold;

        if (iNorgeSiste12Mnd && tidligerePerioder.length > 0) {
            søknad.utenlandsopphold.tidligerePerioder = [];
        }
        if (iNorgeNeste12Mnd && senerePerioder.length > 0) {
            søknad.utenlandsopphold.senerePerioder = [];
        }

        return søknad;
    }
};
