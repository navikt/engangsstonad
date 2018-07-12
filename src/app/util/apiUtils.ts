import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';

export default {
    cleanupSøknad: (søknad: EngangsstonadSoknad) => {
        const { informasjonOmUtenlandsopphold } = søknad;
        const { iNorgeSiste12Mnd, tidligereOpphold } = informasjonOmUtenlandsopphold;
        const { iNorgeNeste12Mnd, senereOpphold } = informasjonOmUtenlandsopphold;

        if (iNorgeSiste12Mnd && tidligereOpphold.length > 0) {
            søknad.informasjonOmUtenlandsopphold.tidligereOpphold = [];
        }
        if (iNorgeNeste12Mnd && senereOpphold.length > 0) {
            søknad.informasjonOmUtenlandsopphold.senereOpphold = [];
        }

        return søknad;
    }
};
