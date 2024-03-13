const executeStatement = require('../queries')
module.exports = class UserModel
{
    #id;
    user_name; // username
    password;
    email;
    dateOfBirth; // dob
    phone;
    addressId; // address_id
    constructor ({ user_name, password, email, dateOfBirth, phone, addressId }, id = null )
    {
        this.#id = id;
        this.user_name = user_name; // username in db
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth; // dob
        this.phone = phone;
        this.addressId = addressId; // address_id
    }
    static tableName = 'users';
    get id()
    {
        return this.#id
    }
    /*
    * note: find all users
    * */
    static async findAll() {
        try {
            const [results] = await executeStatement(`SELECT * FROM users`);
            if (results.length > 0) {
                return {
                    success: true,
                    users: results
                };
            } else {
                return {
                    success: false,
                    message: "No users found."
                };
            }
        } catch (error) {
            console.error("Error in findAll method:", error);
            return {
                success: false,
                message: `Error retrieving users: ${error.message}`
            };
        }
    }
    static async findAllClass()
    {
        const [results] = await executeStatement('select * from users');
        return results.map((userObj) => {
            return new UserModel(
                {
                    user_name: userObj.username,
                    password: userObj.password,
                    email: userObj.email,
                    dateOfBirth: userObj.dob,
                    phone: userObj.phone,
                    addressId: userObj.address_id,
                }, userObj.id
            )
        })
    }
    static async findAllClass2() {
        try {
            const [rows] = await executeStatement(`SELECT * FROM ${UserModel.tableName}`);
            return rows.map(row => {
                const { id, username, password, email, dob, phone, address_id } = row;
                const userData = {
                    user_name: username,
                    password,
                    email,
                    dateOfBirth: dob,
                    phone,
                    addressId: address_id
                };
                return new UserModel(userData, id);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
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
                await executeStatement(`SELECT * FROM ${UserModel.tableName} WHERE id = ? limit 1`, [id]);
            // console.log(rows);
            if ( ! rows || rows.length === 0 )
            {
                return [];
            }
            const row = rows[0];
            const { id: userId, username, password, email, dob, phone, address_id } = row;
            const userData = {
                user_name: username,
                password,
                email,
                dateOfBirth: dob,
                phone,
                addressId: address_id
            }
            return new UserModel( userData, userId );
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error for higher-level handling, if needed
        }
    }
    static async findById(id) {
        try {
            const [results] = await executeStatement(`SELECT * FROM users WHERE id = ?`, [id]);

            if (results.length > 0) {
                return {
                    success: true,
                    user: results[0]
                };
            } else {
                return {
                    success: false,
                    message: `User with id ${id} not found.`
                };
            }
        } catch (error) {
            console.error("Error in findById method:", error);
            return {
                success: false,
                message: `Error finding user with id ${id}: ${error.message}`
            };
        }
    }
    /*
    * note: create new user
    * */
    static async createClass({ username, password, email, dob, phone }) {
        if (!username || !password || !email || !dob || !phone) {
            return {
                success: false,
                message: "All fields are required."
            };
        }
        try {
            const sql =
                `INSERT INTO ${UserModel.tableName} (username, password, email, dob, phone) VALUES (?, ?, ?, ?, ?)`;
            const [results] = await executeStatement(sql, [username, password, email, dob, phone]);
            // console.log(results);
            if (results && results.insertId) {
                const newUser = new UserModel({
                    user_name: username,
                    password,
                    email,
                    dateOfBirth: dob,
                    phone
                }, results.insertId)
                return {
                    success: true,
                    insertId: results.insertId,
                    user: newUser.getInstance(),
                    message: "User created successfully."
                };
            } else {
                return {
                    success: false,
                    message: "User was not created. No ID was generated."
                };
            }
        } catch (error) {
            console.error("Error in UserModel.create:", error);
            return {
                success: false,
                message: `Error creating user: ${error.message}`
            };
        }
    }
    static async create({ username, password, email, dob, phone }) {
        if (!username || !password || !email || !dob || !phone) {
            return {
                success: false,
                message: "All fields are required."
            };
        }
        try {
            const sql = `INSERT INTO users (username, password, email, dob, phone) VALUES (?, ?, ?, ?, ?)`;
            const [results] = await executeStatement(sql, [username, password, email, dob, phone]);

            if (results && results.insertId) {
                return {
                    success: true,
                    insertId: results.insertId,
                    message: "User created successfully."
                };
            } else {
                return {
                    success: false,
                    message: "User was not created. No ID was generated."
                };
            }
        } catch (error) {
            console.error("Error in UserModel.create:", error);
            return {
                success: false,
                message: `Error creating user: ${error.message}`
            };
        }
    }
    /*
    * delete user by id
    * */
    static async deleteClass(id) {
        try {
            const user = await this.findByIdClass(id);
            if ( ! user || user.length === 0 )
            {
                return {
                    success: false,
                    message: `User with id ${id} not found.`,
                    affectedRows: 0
                };
            }
            const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
            const [results] = await executeStatement(sql, [id]);

            if (results && results.affectedRows > 0) {
                return {
                    success: true,
                    user: user.getInstance(),
                    message: `User with id ${id} deleted successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `User with id ${id} was not deleted.`,
                    affectedRows: results ? results.affectedRows : 0
                };
            }
        } catch (error) {
            console.error("Error in delete method:", error);
            throw new Error(`Error deleting user with id ${id}: ${error.message}`);
        }
    }
    static async delete(id) {
        try {
            const sql = `DELETE FROM users WHERE id = ?`;
            const [results] = await executeStatement(sql, [id]);

            if (results.affectedRows > 0) {
                return {
                    success: true,
                    message: `User with id ${id} deleted successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `User with id ${id} not found.`,
                    affectedRows: results.affectedRows
                };
            }
        } catch (error) {
            console.error("Error in delete method:", error);
            throw new Error(`Error deleting user with id ${id}: ${error.message}`);
        }
    }

    /*
    * update user by id
    * */
    static async updateClass(id, { username, password, email, dob, phone }) {
        try {
            const sql = `UPDATE users 
                     SET username = ?, password = ?, email = ?, dob = ?, phone = ?
                     WHERE id = ?`;
            const [results] = await executeStatement(sql, [username, password, email, dob, phone, id]);
            // const userData = {
            //     user_name: username,
            //     password,
            //     email,
            //     dateOfBirth: dob,
            //     phone
            // }
            // const updatedUser = new UserModel( userData, id );
            const updatedUser2 = new UserModel({
                user_name: username,
                password,
                email,
                dateOfBirth: dob,
                phone
            }, id)
            if (results.affectedRows > 0) {
                return {
                    success: true,
                    // user: updatedUser.getInstance(),
                    user2: updatedUser2.getInstance(),
                    message: `User with id ${id} updated successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `User with id ${id} not found.`,
                    affectedRows: results.affectedRows
                };
            }
        } catch (error) {
            console.error("Error in update method:", error);
            throw new Error(`Error updating user with id ${id}: ${error.message}`);
        }
    }
    static async update(id, { username, password, email, dob, phone }) {
        try {
            const sql = `UPDATE users 
                     SET username = ?, password = ?, email = ?, dob = ?, phone = ?
                     WHERE id = ?`;

            const [results] = await executeStatement(sql, [username, password, email, dob, phone, id]);

            if (results.affectedRows > 0) {
                return {
                    success: true,
                    message: `User with id ${id} updated successfully.`,
                    affectedRows: results.affectedRows
                };
            } else {
                return {
                    success: false,
                    message: `User with id ${id} not found.`,
                    affectedRows: results.affectedRows
                };
            }
        } catch (error) {
            console.error("Error in update method:", error);
            throw new Error(`Error updating user with id ${id}: ${error.message}`);
        }
    }

    getInstance()
    {
        // return { ...this, id: this.#id }
        return { id: this.#id, ...this }
    }

}





