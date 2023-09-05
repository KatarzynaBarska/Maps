import {AdRecord} from "../records/ad.record";



test('AdRecord returns data from database for one entry.', async () => {
    const ad = await  AdRecord.getOne("abc");

    console.log('ad.test.ts',ad);

    expect(ad).toBeDefined();
    //expect(ad.id).toBe('abc');
    //expect(ad.name).toBe('Test');
});

test('AdRecord returns null from database for unexciting entry.', async () => {
    const ad = await AdRecord.getOne('----');
    expect(ad).toBeNull();
})