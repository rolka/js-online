const executeStatement = require('../queries')
module.exports = class Address
{
    #id;
    country;
    county;
    municipality;
    zipcode;
    city;
    street;
    houseNumber; // house_number
    apartmentNumber; // apartment_number
    #tableName;
    constructor ( { country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber }, id = null )
    {
        this.#id = id;
        this.country = country;
        this.county = county;
        this.municipality = municipality;
        this.zipcode = zipcode;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.apartmentNumber = apartmentNumber;
        // this.#tableName = Address.#getTableName();
        this.#tableName = 'addresses';
    }
    static tableName = 'addresses'; // remove when all replaced
    // tableName = 'addresses';
    // static #getTableName() {
    //     return 'addresses'; // You can fetch the table name from wherever it's stored
    // }

    get id()
    {
        return this.#id
    }
    /*
     * note: find all
     * */
    static async findAll() {
        try {
            const [results] = await executeStatement(`SELECT * FROM ${this.tableName}`);
            if (results.length > 0) {
                return {
                    success: true,
                    addresses: results
                };
            } else {
                return {
                    success: false,
                    message: "No addresses found."
                };
            }
        } catch (error) {
            console.error("Error in findAll method:", error);
            return {
                success: false,
                message: `Error retrieving addresses: ${error.message}`
            };
        }
    }
    static async findAllClass()
    {
        const [results] = await executeStatement(`select * from ${this.tableName}`);
        return results.map((obj) => {
            return new Address(
                {
                    country: obj.country,
                    county: obj.county,
                    municipality: obj.municipality,
                    zipcode: obj.zipcode,
                    city: obj.city,
                    street: obj.street,
                    houseNumber: obj.house_number,
                    apartmentNumber: obj.apartment_number
                }, obj.id
            )
        })
    }
    static async findAllClass2() {
        try {
            const [rows] = await executeStatement(`SELECT * FROM ${this.tableName}`);
            return rows.map(row => {
                const { id, country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber } = row;
                const data = {
                    country,
                    county,
                    municipality,
                    zipcode,
                    city,
                    street,
                    house_number: houseNumber,
                    apartment_number: apartmentNumber
                };
                return new Address(data, id);
            });
        } catch (error) {
            console.error('Error fetching addresses:', error);
            throw error; // Re-throw the error for higher-level handling, if needed
        }
    }
    /*
     * note: find user by id
     * */
    static async findByIdClass(id)
    {
        try {
            const [rows] =
                await executeStatement(`SELECT * FROM ${this.tableName} WHERE id = ? limit 1`, [id]);
            // console.log(rows);
            if ( ! rows || rows.length === 0 )
            {
                return [];
            }
            const row = rows[0];
            const { id, country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber } = row;
            const data = {
                country,
                county,
                municipality,
                zipcode,
                city,
                street,
                house_number: houseNumber,
                apartment_number: apartmentNumber
            }
            return new Address( data, id );
        } catch (error) {
            console.error('Error fetching addresses:', error);
            throw error; // Re-throw the error for higher-level handling, if needed
        }
    }
    static async findById(id) {
        try {
            const [results] = await executeStatement(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);

            if (results.length > 0) {
                return {
                    success: true,
                    address: results[0]
                };
            } else {
                return {
                    success: false,
                    message: `Address with id ${id} not found.`
                };
            }
        } catch (error) {
            console.error("Error in findById method:", error);
            return {
                success: false,
                message: `Error finding address with id ${id}: ${error.message}`
            };
        }
    }
    /*
     * note: create new user
     * */
    async createClass() {
        try {
            const sql =
                `INSERT INTO ${this.#tableName} 
                (country, county, municipality, zipcode, city, street, house_number, apartment_number) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const [results] = await executeStatement(sql, [
                this.country,
                this.county,
                this.municipality,
                this.zipcode,
                this.city,
                this.street,
                this.houseNumber,
                this.apartmentNumber
            ]);
            /*
            * fix return
            * */
            this.#id = results.insertId;
            return results;

            if (results && results.insertId) {
                this.#id = results.insertId;
                return {
                    success: true,
                    insertId: results.insertId,
                    user: this,
                    message: "Address created successfully."
                };
            } else {
                return {
                    success: false,
                    message: "Address was not created. No ID was generated."
                };
            }
        } catch (error) {
            console.error("Error in Address.create:", error);
            return {
                success: false,
                message: `Error creating address: ${error.message}`
            };
        }
    }

    static async create({ country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber }) {
        if ( !country || !county || !municipality || !zipcode || !city || !street || !houseNumber || !apartmentNumber ) {
            return {
                success: false,
                message: "All fields are required."
            };
        }
        try {
            const sql =
                `INSERT INTO ${this.tableName} ( country, county, municipality, zipcode, city, street, house_number, apartment_number ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const [results] = await executeStatement(sql, [ country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber ]);

            if (results && results.insertId) {
                return {
                    success: true,
                    insertId: results.insertId,
                    message: "Address created successfully."
                };
            } else {
                return {
                    success: false,
                    message: "Address was not created. No ID was generated."
                };
            }
        } catch (error) {
            console.error("Error in Address.create:", error);
            return {
                success: false,
                message: `Error creating address: ${error.message}`
            };
        }
    }
    /*
     * delete user by id
     * */
    static async deleteClass(id) {
        try {
            const address = await this.findByIdClass(id);
            if ( ! address || address.length === 0 )
            {
                return {
                    success: false,
                    message: `Address with id ${id} not found.`,
                    affectedRows: 0
                };
            }
            const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
            const [results] = await executeStatement(sql, [id]);

            if (results && results.affectedRows > 0) {
                return {
                    success: true,
                    address: address.getInstance(),
                    message: `Address with id ${id} deleted successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `Address with id ${id} was not deleted.`,
                    affectedRows: results ? results.affectedRows : 0
                };
            }
        } catch (error) {
            console.error("Error in delete method:", error);
            throw new Error(`Error deleting address with id ${id}: ${error.message}`);
        }
    }
    static async delete(id) {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
            const [results] = await executeStatement(sql, [id]);

            if (results.affectedRows > 0) {
                return {
                    success: true,
                    message: `Address with id ${id} deleted successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `Address with id ${id} not found.`,
                    affectedRows: results.affectedRows
                };
            }
        } catch (error) {
            console.error("Error in delete method:", error);
            throw new Error(`Error deleting address with id ${id}: ${error.message}`);
        }
    }
    /*
     * update user by id
     * */
    static async updateClass(id, { country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber }) {
        try {
            const sql = `UPDATE ${this.tableName} 
                     SET country = ?, county = ?, municipality = ?, zipcode = ?, city = ?, street = ?,  house_number = ?, apartment_number = ?
                     WHERE id = ?`;
            const [results] = await executeStatement(sql, [ country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber, id]);
            // const userData = {
            //     user_name: username,
            //     password,
            //     email,
            //     dateOfBirth: dob,
            //     phone
            // }
            // const updatedUser = new UserModel( userData, id );
            const address = new Address({
                country,
                county,
                municipality,
                zipcode,
                city,
                street,
                house_number: houseNumber,
                apartment_number: apartmentNumber
            }, id)
            if (results.affectedRows > 0) {
                return {
                    success: true,
                    // user: updatedUser.getInstance(),
                    address: address.getInstance(),
                    message: `Address with id ${id} updated successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `Address with id ${id} not found.`,
                    affectedRows: results.affectedRows
                };
            }
        } catch (error) {
            console.error("Error in update method:", error);
            throw new Error(`Error updating address with id ${id}: ${error.message}`);
        }
    }
    static async update(id, { country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber }) {
        try {
            const sql =
                `UPDATE ${this.tableName} SET country = ?, county = ?, municipality = ?, zipcode = ?, city = ?, street = ?,  house_number = ?, apartment_number = ?
                     WHERE id = ?`;
            const [results] = await executeStatement(sql, [ country, county, municipality, zipcode, city, street, houseNumber, apartmentNumber, id]);

            if (results.affectedRows > 0) {
                return {
                    success: true,
                    message: `Address with id ${id} updated successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `Address with id ${id} not found.`,
                    affectedRows: results.affectedRows
                };
            }
        } catch (error) {
            console.error("Error in update method:", error);
            throw new Error(`Error updating address with id ${id}: ${error.message}`);
        }
    }

    getInstance()
    {
        // return { ...this, id: this.#id }
        return { id: this.#id, ...this }
    }
}





