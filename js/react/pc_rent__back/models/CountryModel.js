const executeStatement = require('../queries');

module.exports = class CountryModel
{
    #id;
    country;
    countryShort;
    constructor ({ country, countryShort }, id = null )
    {
        this.#id = id;
        this.country = country;
        this.countryShort = countryShort;
    }
    get id()
    {
        return this.#id
    }
    get country()
    {
        return this.country
    }
    static async findAll()
    {
        // veikia
        const [results, fields] =
            await executeStatement(`select * from countries`);
        return results;

        // neveikia
        // const results = await executeStatement('select * from countries');
        // console.log(results[0])
        // const result = results[0].map((countryObj) => {
        //     new CountryModel(
        //         {
        //             country: 'countryObj.coutry_title',
        //             countryShort: 'countryObj.country_code'
        //         }, countryObj.id
        //     )
        // })
        // return result;
    }
    static async findById(id)
    {
        // const [results, fields] =
        const result =
            await executeStatement(`select * from countries where id = ?`, [ id ]);
        const countyObj = new CountryModel({
            country: result.coutry_title,
            countryShort: result.country_code
        }, id)
        // return countyObj;
        // return results;
        return result;
    }
    static async deleteById(id)
    {
        // const [results, fields] =
        const result =
            await executeStatement(`delete from countries where id = ?`, [ id ]);
        // const countyObj = new CountryModel({
        //     country: result.coutry_title,
        //     countryShort: result.country_code
        // }, id)
        // return countyObj;
        // return results;
        return result;
    }

    async save()
    {
        const result =
            await executeStatement(`insert into countries ( coutry_title, country_code ) values ( ?, ? ) `,
            [ this.country, this.countryShort ] );
        this.#id = result[0].insertId;
        console.log(result);
    }
    getInstance()
    {
        return { ...this, id: this.#id }
    }

}