const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'pc_rent',
    password: ''
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Successfully connected to the database.');
    // executeStatement();


    // Example query, replace 'your_table_name' with your actual table name
    // connection.query('SELECT * FROM users', (queryError, results, fields) => {
    //     if (queryError) {
    //         console.error('Error executing the query:', queryError);
    //         return;
    //     }
    //     console.log('Results:', results);

        // Close the connection when done
        // connection.end();
    // });
});

const execute = async ( sql, parameters = [] ) => {
    try
    {
        const result = await connection.promise()
            .execute(sql, parameters);
        // select * from users
        return result;
    }
    catch ( error )
    {
        console.error(`Error executing query ${sql}. Error: ${error}`)
        throw error;
    }
}

module.exports = execute;

const executeStatement = async () =>
{
    // read
    const getResult = await connection
        .promise()
        .execute('select * from users where id = 1');
    console.log(getResult);

    // create
    // const createResult = await connection
    //     .promise()
    //     .execute('INSERT INTO users (username, password, email, dob, phone, address_id) VALUES (?, ?, ?, ?, ?, ?)', ['john_doe_2000', 'hashed_password', 'john_doe@example.com', '1990-01-01', '1234567890', 1]);
    // console.log(createResult);

    // update
    // const updateResult = await connection
    //     .promise()
    //     .execute(`-- update users set username = 'updated_username' where id = 1 `);
    // console.log(updateResult);

    // delete
    // const createResult = await connection
    //     .promise()
    //     .execute(`-- delete from users where id = 6`);
    // console.log(createResult);



}