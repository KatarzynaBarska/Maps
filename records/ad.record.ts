import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {

    public description: string;
    public id: string;
    public lat: number;
    public lon: number;
    public name: string;
    public price: number;
    public url: string;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków.')
        }
        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');
        }
        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9999999.');
        }
        //@TODO: Check if URL is valid!
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków');
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.id = obj.id;
        this.price = obj.price;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.url = obj.url;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE  `id` = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);

    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;
//tworzymy obj na bazie obj result(AdEntity) i w ten sposób powstaje proste filtrowanie informacji przesyłanych na frontend podczas wyszukiwania metoda .findAll
        return results.map(result => {
            const {
                id, lat, lon,
            } = result;
            return {
                id, lat, lon,
            };
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted.');
        }
        await pool.execute("INSERT INTO `ads` (`id`, `name`, `description`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :url, :lat, :lon)", this);
    }
}

    // async insert(): Promise<string> {
    //     if (!this.id) {
    //         this.id = uuid();
    //     }
    //
    //     await pool.execute("INSERT INTO `children`(`id`, `name`) VALUES(:id, :name)", {
    //         id: this.id,
    //         name: this.name,
    //     });
    //
    //     return this.id;
    // }

