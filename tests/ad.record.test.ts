import {AdRecord} from "../records/ad.record";

const defaultObj = {
    id: 'abc',
    description: "Test descr",
    lat: 3,
    lon: 2,
    name: "test name",
    price: 1,
    url: "https://localhost:8080"

};

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    console.log('ad.record.rest.ts', ad)

    expect(ad.name).toBe('test name');
    expect(ad.description).toBe('Test descr');
    expect(ad.lat).toBe(3);
    expect(ad.lon).toBe(2);
});

test('Validates invalid price', () => {
expect(() =>  new AdRecord({
    ...defaultObj,
    price: -3,
})).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9999999.')
});