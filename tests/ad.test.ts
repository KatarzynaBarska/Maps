import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

const defaultObj = {
    description: "Test descr",
        lat: 3,
        lon: 2,
        name: "test name",
        price: 1,
        url: "https://localhost:8080",
};

afterAll(async () => {
    await pool.end();
});

test('AdRecord returns data from database for one entry.', async () => {

    const ad = await  AdRecord.getOne('abc');

    console.log('ad.test.ts',ad);

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Test');
});

test('AdRecord.getOne returns null from database for unexciting entry.', async () => {
    const ad = await AdRecord.getOne('----');
    expect(ad).toBeNull();
});

test( 'AdRecord.findAll returns array of found entries. ', async () => {

    const ads = await AdRecord.findAll('');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "a".', async () => {
    const ads = await AdRecord.findAll('e');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();

});


test('AdRecord.findAll returns empty array when searching for something that does not exist.', async () => {
    const ads = await AdRecord.findAll('--------------------------------------------------------------------------');

    expect(ads).toEqual([]);

});

test('AdRecord.findAll returns smaller amount of data.', async () => {
    const ads = await AdRecord.findAll('');

   expect((ads[0] as AdEntity).price).toBeUndefined();
   expect((ads[0] as AdEntity).description).toBeUndefined();
   expect((ads[0] as AdEntity).name).toBeUndefined();
   expect((ads[0] as AdEntity).url).toBeUndefined();


});

test('AdRecord.insert inserts new UUID.', async () => {

    const ad = new AdRecord( defaultObj);
await ad.insert();

expect(ad.id).toBeDefined();
expect(typeof ad.id).toBe('string');
});

test('AdRecord.insert inserts data to database.', async () => {

    const ad = new AdRecord( defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
});
