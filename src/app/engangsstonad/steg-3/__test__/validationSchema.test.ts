import Steg3ValidationSchema from '../validationSchema';
import { Questions } from '../questions';

describe('Steg3 validation schema', () => {
    it('harVærtIUtlandSiste12Mnd spørsmålet må besvares', async () => {
        await expect(
            Steg3ValidationSchema().validateAt(Questions.harVærtIUtlandSiste12Mnd, {
                [Questions.harVærtIUtlandSiste12Mnd]: undefined
            } as any)
        ).rejects.toBeDefined();
    });

    it('oppholdSiste12Mnd må ha minst et element hvis harVærtIUtlandSiste12Mnd er true', async () => {
        await expect(
            Steg3ValidationSchema().validateAt(Questions.oppholdSiste12Mnd, {
                [Questions.harVærtIUtlandSiste12Mnd]: false,
                [Questions.oppholdSiste12Mnd]: []
            } as any)
        ).resolves.toBeTruthy();

        await expect(
            Steg3ValidationSchema().validateAt(Questions.oppholdSiste12Mnd, {
                [Questions.harVærtIUtlandSiste12Mnd]: true,
                [Questions.oppholdSiste12Mnd]: []
            } as any)
        ).rejects.toBeDefined();
    });

    it('harVærtIUtlandSiste12Mnd spørsmålet må besvares', async () => {
        await expect(
            Steg3ValidationSchema().validateAt(Questions.skalVæreIUtlandNeste12Mnd, {
                [Questions.skalVæreIUtlandNeste12Mnd]: undefined
            } as any)
        ).rejects.toBeDefined();
    });

    it('oppholdNeste12Mnd må ha minst et element hvis skalVæreIUtlandNeste12Mnd er true', async () => {
        await expect(
            Steg3ValidationSchema().validateAt(Questions.oppholdNeste12Mnd, {
                [Questions.skalVæreIUtlandNeste12Mnd]: false,
                [Questions.oppholdNeste12Mnd]: []
            } as any)
        ).resolves.toBeTruthy();

        await expect(
            Steg3ValidationSchema().validateAt(Questions.oppholdNeste12Mnd, {
                [Questions.skalVæreIUtlandNeste12Mnd]: true,
                [Questions.oppholdNeste12Mnd]: []
            } as any)
        ).rejects.toBeDefined();
    });
});
