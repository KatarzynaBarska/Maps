// import {AdRecord} from "../records/ad.record";
//
//
// let ad: AdRecord;
//
// beforeAll(async () => {
//     ad = new AdRecord()
// });

import {AdRecord} from "../records/ad.record";

const defaultObj = {
    id: 'dsfs',
    description: "Test descr",
    lat: 0,
    lon: 2,
    name: "test name",
    price: 1,
    url: "https://localhost:8080"

}

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('test name');
    expect(ad.description).toBe('Test descr');
});

test('Validates invalid price', () => {
expect(() =>  new AdRecord({
    ...defaultObj,
    price: -3,
})).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9999999.')
});